from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
import warnings
from pathlib import Path

# Ignore all deprecation warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
current_script = Path(__file__)
root_path = current_script.parent.parent.parent.parent
facts_path = root_path / "database/chroma/emb"
print(facts_path)


def ask_chroma(user_input):
    load_dotenv()

    chat = ChatOpenAI()
    embeddings = OpenAIEmbeddings()
    db = Chroma(persist_directory=str(facts_path),
                embedding_function=embeddings)

    retriever = db.as_retriever()

    chain = RetrievalQA.from_chain_type(llm=chat,
                                        retriever=retriever,
                                        chain_type="stuff")

    result = chain.run(user_input)

    return result
