import React, { useEffect, useRef, useState } from "react";
import { extractOperation, opsToText } from "../helper/stringHandle";
import { initWebsocket } from "../helper/socket";
import { applyOT } from "./classes/OTfunctions";

function TextArea({ textValue, handleTextChange }) {
  return <textarea onChange={handleTextChange} value={textValue}></textarea>;
}

export function Editor({ roomName }) {
  const [opsList, setOpsList] = useState([]);
  const [textValue, setTextValue] = useState("");

  const ack = useRef(true);
  const pendingChanges = useRef([]);
  const buffer = useRef([]);
  const rid = useRef(0);

  useEffect(() => {
    for (let i = 0; i < buffer.current.length; i++) {
      pendingChanges.current.push(buffer.current[i]);
    }
    buffer.current = [];
    setTextValue(opsToText(opsList));
  }, [opsList]);

  useEffect(() => {
    // attempt sync if ack true
    if (ack) sendSync();
  }, [ack]);

  useEffect(() => {
    const socket = initWebsocket();
    function receiveText(payload) {
      if (payload.socketId === socket.id) {
        ack.current = true;
      } else {
        pendingChanges.current.map((op) => applyOT(op, payload.op));
        // const unsyncStartIdx = opsList.length - pendingChanges.current.length;
        // let temp_list = [];
        // console.log(opsList);
        // for (let i = unsyncStartIdx; i < opsList.length; i++) {
        //   temp_list.push(applyOT(opsList[i], payload.op));
        // }
        setOpsList([...opsList, payload.op]);
      }
      rid.current = payload.rid;
    }
    socket.on("syncTextResponse", receiveText);
    return () => socket.off("syncTextResponse", receiveText);
  }, [opsList]);

  const sendSync = () => {
    const socket = initWebsocket();
    if (ack.current && pendingChanges.current.length > 0) {
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
      buffer.current.push(op);
      // handleSync(op);
    }
  };
  return (
    <div>
      <TextArea handleTextChange={handleTextChange} textValue={textValue} />
      <button
        onClick={() => {
          sendSync();
        }}
      >
        Sync
      </button>
    </div>
  );
}
