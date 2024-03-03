import { Button, TextField } from "@mui/material";

interface ChatInputFormProps {
  inputText: string;
  handleInputChange: any;
  sendMessage: () => void;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  inputText,
  handleInputChange,
  sendMessage,
}) => (
  <div
    className="chatbot-input-form"
    style={{ display: "flex", alignItems: "center" }}
  >
    <TextField
      fullWidth
      value={inputText}
      onChange={handleInputChange}
      placeholder="Type your message..."
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      variant="outlined"
      size="small"
      sx={{ marginRight: "8px" }}
    />
    <Button variant="contained" color="primary" onClick={sendMessage}>
      Send
    </Button>
  </div>
);
