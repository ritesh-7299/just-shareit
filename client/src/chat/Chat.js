import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:5000");

import { socket } from "../socket.js";

export default function Chat() {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  const connectUser = () => {
    setConnected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendChat", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("getChat", (payload) => {
      console.log("FROM SERVER:", payload);
    });
  }, [socket]);

  return (
    <div>
      Chat
      {!connected ? (
        <button onClick={connectUser}>Connect</button>
      ) : (
        <form onSubmit={handleSubmit}>
          Enter message
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}
