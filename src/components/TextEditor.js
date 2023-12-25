import React, { useEffect, useState } from "react";
import { ContentBlock, Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import SideBar from "./SideBar";
import { ContentState } from "draft-js";
import { convertToRaw, convertFromRaw } from "draft-js";
import { initWebsocket } from "../helper/socket";

function TextEditor({ roomName }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    const socket = initWebsocket();

    socket.on("contentChanges", (payload) => {
      let newState = EditorState.createWithContent(convertFromRaw(payload));
      setEditorState(newState);
    });
  }, []);
  // const changeLine = (line, content, contentState) => {
  //   let result = convertToRaw(contentState);
  //   if (line < result.blocks.length) {
  //     result.blocks[line].text = content;
  //     return ContentState.createFromBlockArray(result.blocks);
  //   }
  //   return contentState;
  // };
  const onEditorStateChange = (_editorState) => {
    setEditorState(_editorState);
  };
  const onContentStateChange = (_contentState) => {
    const socket = initWebsocket();
    socket.emit(
      "contentChanges",
      roomName,
      convertToRaw(editorState.getCurrentContent())
    );
  };
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen pb-4">
      <button onClick={() => {}}>clear</button>
      <div className="ml-4">
        <Editor
          // contentState={contentState}
          onContentStateChange={onContentStateChange}
          editorState={editorState}
          placeholder="Type @ to insert"
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex !gap-6 !p-1 !rounded-full !bg-[#edf2fa] sticky top-0 z-50 !justify-center mx-auto"
          editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border !h-screen"
        />
      </div>

      {/* <SideBar /> */}
    </div>
  );
}

export default TextEditor;
