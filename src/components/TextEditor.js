import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import SideBar from "./SideBar";
import { ContentState } from "draft-js";
import { convertToRaw } from "draft-js";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState(
    ContentState.createFromText("")
  );

  const onEditorStateChange = (_editorState) => {
    setEditorState(_editorState);
  };
  const onContentStateChange = (_contentState) => {
    setContentState(_contentState);
    console.log(_contentState);
  };
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen pb-4">
      <button
        onClick={() => {
          setContentState({});
          console.log(contentState);
        }}
      >
        clear
      </button>
      <div className="ml-4">
        <Editor
          editorState={editorState}
          onContentStateChange={onContentStateChange}
          defaultContentState={contentState}
          // contentState={contentState}
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
