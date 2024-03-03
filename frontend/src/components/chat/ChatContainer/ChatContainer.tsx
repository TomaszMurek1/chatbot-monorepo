import React, { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatInputForm } from "../ChatInputForm/ChatInputForm";

interface ChatContainerProps {
  messages: any;
  ws: any;
  closeChat: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  ws,
  closeChat,
  messages,
}) => {
  const [chatText, setChatText] = useState("");

  console.log("messages2", messages);
  const ChatMessages = () => (
    <div className="chatbot-messages">
      {messages.map((message: any, index: any) => {
        console.log(message);
        return (
          <div
            key={index}
            className={`message ${
              message.user ? "user-message" : "ai-message"
            }`}
          >
            {message}
          </div>
        );
      })}
    </div>
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(event.target.value);
  };

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && chatText.trim()) {
      ws.send(chatText);
      setChatText(""); // Clear input after sending
    }
  };

  return (
    <div className="chatbot-container ">
      <IconButton
        color="primary"
        style={{
          color: "gray",
          position: "absolute",
          right: 8,
          top: 8,
        }}
        onClick={closeChat}
      >
        <CloseIcon />
      </IconButton>
      <ChatMessages />
      <ChatInputForm
        inputText={chatText}
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
      />
    </div>
  );
};
