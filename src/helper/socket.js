import { io } from "socket.io-client";
let socket = null;

export const initWebsocket = () => {
  if (socket) return socket;
  socket = io(process.env.REACT_APP_WS_SERVER);

  //   socket.on("connect", () => {
  //     socket.emit("join", roomName);
  //     console.log("connected");
  //     alert("Connected");
  //   });
  //   socket.on("disconnect", () => {});

  //   socket.on("roomNotify", (message) => {
  //     alert(message);
  //   });

  //   socket.on("contentChanges", (payload) => {
  //     payload.line;
  //     payload.line_data;
  //   });
  return socket;
};
