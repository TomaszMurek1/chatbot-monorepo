import { IconButton, styled } from "@mui/material";

export const ChatContainerWrapper = styled("div")({
  display: "grid",
  gridTemplateRows: "1fr auto",
  gap: "16px",
  height: "calc(100vh - 200px)", // Adjust the height as needed with padding
  width: "500px",
  margin: "20px auto", // Adjusted to add some padding from the top and bottom
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  backgroundColor: "#f8f8f8",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden", // To ensure the border-radius is respected
  minHeight: "200px",
  position: "relative",
});

export const StyledIconButton = styled(IconButton)({
  color: "gray",
  position: "absolute",
  right: "8px",
  top: "8px",
});
