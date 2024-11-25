import React, { useState } from "react";
import RoomForm from "./components/RoomForm";
import ChatRoom from "./components/ChatRoom";

const App = () => {
  const [roomId, setRoomId] = useState(null);
  

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9);
    setRoomId(newRoomId);
    alert(`Room created! ID: ${newRoomId}`);
  };

  const handleJoinRoom = (id) => {
    if (id.trim()) {
      setRoomId(id);
    }
  };

  const handleLeaveRoom = () => {
    setRoomId(null);
  };

  return (
    <>
      {roomId ? (
        <ChatRoom roomId={roomId} onLeaveRoom={handleLeaveRoom} />
      ) : (
        <RoomForm onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      )}
    </>
  );
};

export default App;
