import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const RoomForm = ({ onCreateRoom, onJoinRoom }) => {
  const [roomId, setRoomId] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkBg text-white">
      <h1 className="text-3xl font-bold text-accent mb-6">Welcome to ChatApp</h1>
      <div className="flex flex-col w-80 space-y-4">
        <button
          onClick={onCreateRoom}
          className="bg-accent text-black py-2 rounded hover:bg-lightAccent transition"
        >
          Create Room
        </button>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="px-4 py-2 rounded bg-primary text-white border-none outline-none"
        />
        <button
          onClick={() => onJoinRoom(roomId)}
          className="bg-accent text-black py-2 rounded hover:bg-lightAccent transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
