import "./App.css";
import { useState } from "react";
import { initWebsocket } from "./helper/socket";
import TextEditor from "./components/TextEditor";
const RoomNameComponent = ({ roomName, setRoomName, setShowEditor }) => {
  const enterRoom = () => {
    const socket = initWebsocket();

    socket.on("connect", () => {
      socket.emit("join", roomName);
      console.log("connected");
    });

    socket.on("roomNotify", (msg) => {
      alert(msg);
    });

    setShowEditor(true);
  };
  return (
    <div>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Room Name
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
      ></textarea>
      <button onClick={() => enterRoom()}>Enter</button>
    </div>
  );
};
const App = () => {
  const [roomName, setRoomName] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="App">
      {showEditor ? (
        <TextEditor roomName={roomName} />
      ) : (
        <RoomNameComponent
          roomName={roomName}
          setRoomName={setRoomName}
          setShowEditor={setShowEditor}
        />
      )}
    </div>
  );
};

export default App;
