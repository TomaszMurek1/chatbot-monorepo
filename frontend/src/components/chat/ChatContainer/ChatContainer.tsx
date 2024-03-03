import React, { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ChatInputForm } from "../ChatInputForm/ChatInputForm";
import { ChatContainerWrapper, StyledIconButton } from "./ChatContainerStyles";

interface IMessage {
  user?: boolean;
  text: string;
}

interface ChatContainerProps {
  messages: string[];
  ws: WebSocket | null;
  closeChat: () => void;
}

const ChatMessages = React.memo(({ messages }: { messages: string[] }) => (
  <div className="chatbot-messages">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`message ${message ? "user-message" : "ai-message"}`}
      >
        {message}
      </div>
    ))}
  </div>
));

export const ChatContainer: React.FC<ChatContainerProps> = ({
  ws,
  closeChat,
  messages,
}) => {
  const [chatText, setChatText] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setChatText(event.target.value);
  };

  const sendMessage = (): void => {
    if (ws && ws.readyState === WebSocket.OPEN && chatText.trim()) {
      ws.send(chatText);
      setChatText(""); // Clear input after sending
    }
  };

  return (
    <ChatContainerWrapper>
      <StyledIconButton color="primary" onClick={closeChat}>
        <CloseIcon />
      </StyledIconButton>
      <ChatMessages messages={messages} />
      <ChatInputForm
        inputText={chatText}
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
      />
    </ChatContainerWrapper>
  );
};
