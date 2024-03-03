import React, { useState, useEffect } from "react";
import "./App.css";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { ChatContainer } from "./components/chat/ChatContainer/ChatContainer";

interface IMessage {
  user?: boolean;
  text: string;
}

const App: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const connectWebSocket = () => {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      const newWs = new WebSocket("ws://localhost:8000/ws");
      newWs.onopen = () => console.log("Connected to the server");
      newWs.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);

        console.log("Message from server:", event.data);
      };

      newWs.onerror = (error) => console.error("WebSocket error:", error);
      newWs.onclose = () => console.log("Disconnected from the server");
      setWs(newWs);
    }
  };

  const disconnectWebSocket = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };

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
          <ChatContainer
            isOpen={isOpen}
            ws={ws}
            closeChat={closeChat}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default App;
