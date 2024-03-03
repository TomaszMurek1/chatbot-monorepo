import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ChatInputFormProps {
  inputText: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const InputFormContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
});

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  inputText,
  handleInputChange,
  sendMessage,
}) => (
  <InputFormContainer>
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
  </InputFormContainer>
);
