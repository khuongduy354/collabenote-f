import React, { useEffect, useState } from "react";
import { OpTypes, Operation } from "./classes/operation";
import { findFirstDiff } from "../helper/stringHandle";

function TextArea({ textValue, handleTextChange }) {
  return <textarea onChange={handleTextChange} value={textValue}></textarea>;
}
export const opsToText = (opsList) => {
  let result = [];
  for (let idx in opsList) {
    let op = opsList[idx];
    switch (op.optype) {
      case OpTypes.Insert:
        result[op.position] = op.text;
        break;
      case OpTypes.Delete:
        result[op.position] = "";
        break;
      default:
        throw new Error("Invalid optypes");
    }
  }
  result = result.map((val) => (val === undefined ? "" : val));
  return result.join("");
};
export const extractOperation = (oldVal, newVal) => {
  if (oldVal.length === newVal.length) {
    return null;
  }
  if (oldVal.length > newVal.length) {
    let pos = findFirstDiff(oldVal, newVal);
    return new Operation(OpTypes.Delete, { position: pos });
  }
  if (oldVal.length < newVal.length) {
    let pos = findFirstDiff(oldVal, newVal);
    return new Operation(OpTypes.Insert, {
      position: pos,
      text: newVal.charAt(pos),
    });
  }
};
export function Editor() {
  const [opsList, setOpsList] = useState([]);
  const [textValue, setTextValue] = useState("");

  // list of operations
  //function convert ops -> string
  // text area to render the string

  useEffect(() => {
    setTextValue(opsToText(opsList));
  }, [opsList]);

  const handleTextChange = (e) => {
    let newText = e.target.value;
    const op = extractOperation(textValue, newText);
    if (op) {
      setOpsList([...opsList, op]);
    }
  };
  return (
    <div>
      <TextArea handleTextChange={handleTextChange} textValue={textValue} />
    </div>
  );
}
