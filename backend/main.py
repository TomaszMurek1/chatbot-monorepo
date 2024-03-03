from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from langchain_openai import ChatOpenAI
from langchain.prompts import HumanMessagePromptTemplate, MessagesPlaceholder
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
import warnings
import os
from dotenv import load_dotenv

load_dotenv()

# Ignore all deprecation warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

app = FastAPI()

# Initialize the ChatOpenAI, memory, and chain outside of the endpoint to avoid reinitialization on each connection
chat = ChatOpenAI(model="gpt-3.5-turbo")
memory = ConversationBufferMemory(input_key="content",
                                  memory_key="messages",
                                  return_messages=True)
prompt = ChatPromptTemplate(
    input_variables=["content", "messages"],
    messages=[
        MessagesPlaceholder(variable_name="messages"),
        HumanMessagePromptTemplate.from_template("{content}"),
    ],
)
chain = LLMChain(llm=chat, prompt=prompt, memory=memory)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive message from frontend
            data = await websocket.receive_text()
            content = data  # Assuming the frontend sends a plain text string

            # Process the received content
            result = chain({"content": content, "messages": []})
            text = result["text"]

            # Send the response back to the frontend
            await websocket.send_text(f"Response: {text}")
    except WebSocketDisconnect:
        print("Client disconnected")
