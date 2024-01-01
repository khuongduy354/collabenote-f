import React from "react";
import { Editor } from "./Editor";

function TextEditor({ roomName }) {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen pb-4">
      <button onClick={() => {}}>clear</button>
      <div className="ml-4">
        <Editor roomName={roomName} />
      </div>
    </div>
  );
}

export default TextEditor;
