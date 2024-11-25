import React, { useState, useEffect, useRef } from "react";

const ChatRoom = ({ roomId, onLeaveRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const wsRef = useRef(null); // WebSocket reference to persist the connection

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      // Join the room after establishing the connection
      const joinMessage = JSON.stringify({
        type: "join",
        payload: { roomId },
      });
      ws.send(joinMessage);
    };

    ws.onmessage = (event) => {
      // The message from the server is a string; process it directly
      const serverMessage = event.data;

      // Add the received message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: serverMessage, sender: "Other" },
      ]);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");

    wsRef.current = ws; // Save WebSocket instance to ref

    return () => {
      // Clean up WebSocket connection on component unmount
      ws.close();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Format the message as a string to send to the server
      const chatMessage = JSON.stringify({
        type: "chat",
        payload: { roomId, message: newMessage },
      });
      wsRef.current?.send(chatMessage);

      // Add the message locally to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "You" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen p-28 bg-darkBg text-white flex flex-col">
      <header className="bg-primary py-4 px-6 text-lg font-semibold flex justify-between items-center">
        <span>Room ID: {roomId}</span>
        <button
          onClick={onLeaveRoom}
          className="bg-red-500 text-black py-1 px-3 rounded hover:bg-red-600 transition"
        >
          Leave Room
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.sender === "You" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded ${
                msg.sender === "You" ? "bg-accent text-black" : "bg-secondary"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-primary py-4 px-6 flex">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l bg-secondary text-white border-none outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-accent text-black px-4 py-2 rounded-r hover:bg-lightAccent transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatRoom;
