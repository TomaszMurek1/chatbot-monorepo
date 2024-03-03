import React, { useState, useEffect } from "react";
import "./App.css";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { ChatContainer } from "./components/chat/ChatContainer/ChatContainer";
import { useWebSocket } from "./components/hooks/useWebSocket";

interface IMessage {
  user?: boolean;
  text: string;
}

const App: React.FC = () => {
  const { ws, messages, connectWebSocket, disconnectWebSocket } =
    useWebSocket();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openChat = () => {
    connectWebSocket();
    setIsOpen(true);
  };
  const closeChat = () => {
    disconnectWebSocket();
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("New messages:", messages);
  }, [messages]);

  return (
    <div className="App">
      <h2>WebSocket Chat</h2>
      <div style={{ position: "absolute", right: 32, bottom: 32 }}>
        {!isOpen && (
          <IconButton color="primary" onClick={openChat}>
            <ChatIcon fontSize="large" />
          </IconButton>
        )}
        {isOpen && (
          <ChatContainer ws={ws} closeChat={closeChat} messages={messages} />
        )}
      </div>
    </div>
  );
};

export default App;
