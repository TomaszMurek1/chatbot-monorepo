import { useCallback, useState } from "react";
interface IMessage {
  user?: boolean;
  text: string;
}
export const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const connectWebSocket = useCallback(() => {
    const newWs = new WebSocket("ws://localhost:8000/ws");
    newWs.onopen = () => console.log("Connected to the server");
    newWs.onmessage = (event) => {
      console.log("prevMessages", messages);
      console.log("event.data", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
      console.log("Message from server:", event.data);
    };
    newWs.onerror = (error) => console.error("WebSocket error:", error);
    newWs.onclose = () => console.log("Disconnected from the server");
    setWs(newWs);
  }, []);

  const disconnectWebSocket = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
      setWs(null); // Ensure ws is set to null after closing the connection
    }
  }, [ws]);

  return { ws, messages, connectWebSocket, disconnectWebSocket };
};
