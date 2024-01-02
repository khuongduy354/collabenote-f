import React, { useEffect, useRef, useState } from "react";
import { extractOperation, opsToText } from "../helper/stringHandle";
import { initWebsocket } from "../helper/socket";
import { applyOT } from "./classes/OTfunctions";
import { AlignVerticalTop } from "@mui/icons-material";

function TextArea({ textValue, handleTextChange }) {
  return <textarea onChange={handleTextChange} value={textValue}></textarea>;
}

export function Editor({ roomName }) {
  const [opsList, setOpsList] = useState([]);
  const [textValue, setTextValue] = useState("");

  const ack = useRef(true);
  const pendingChanges = useRef([]);
  const rid = useRef(0);

  useEffect(() => {
    setTextValue(opsToText(opsList));
  }, [opsList]);

  useEffect(() => {
    // attempt sync if ack true
    if (ack) sendSync();
  }, [ack]);

  useEffect(() => {
    const socket = initWebsocket();
    function syncReceiveText(payload) {
      if (payload.socketId === socket.id) {
        ack.current = true;
      } else {
        pendingChanges.current.map((op) => applyOT(op, payload.op));
        const unsyncStartIdx = opsList.length - pendingChanges.current.length;
        let temp_list = [];
        for (let i = unsyncStartIdx; i < opsList.length; i++) {
          temp_list.push(applyOT(opsList[i], payload.op));
        }

        let newOpList = [
          ...opsList.slice(0, unsyncStartIdx),
          ...temp_list,
          payload.op,
        ];
        setOpsList(newOpList);
      }
      rid.current = payload.rid;
    }

    socket.on("syncTextResponse", syncReceiveText);
  }, [opsList]);

  const handleSync = (op) => {
    pendingChanges.current.push(op);
    sendSync();
  };

  const sendSync = () => {
    if (ack.current && pendingChanges.current.length > 0) {
      const socket = initWebsocket();

      const op = pendingChanges.current.shift();
      socket.emit("syncText", roomName, { op, rid: rid.current });
      ack.current = false;
    }
  };

  const handleTextChange = (e) => {
    let newText = e.target.value;
    const op = extractOperation(textValue, newText);
    if (op) {
      setOpsList([...opsList, op]);
      handleSync(op);
    }
  };
  return (
    <div>
      <TextArea handleTextChange={handleTextChange} textValue={textValue} />
    </div>
  );
}
