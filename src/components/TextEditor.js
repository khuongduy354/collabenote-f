import React, { useEffect, useState } from "react";
import { initWebsocket } from "../helper/socket";
import { Editor } from "./Editor";

function TextEditor({ roomName }) {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen pb-4">
      <button onClick={() => {}}>clear</button>
      <div className="ml-4">
        <Editor />
      </div>

      {/* <SideBar /> */}
    </div>
  );
}

export default TextEditor;
