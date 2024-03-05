from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from pathlib import Path
import warnings
import os

current_script = Path(__file__)

root_path = current_script.parent.parent.parent.parent
facts_path = root_path / "database/chroma"
emb_path = facts_path / "emb"

file_path = '/Chatbot/database/chroma/test_data.txt'
is_file_exists = os.path.isfile(file_path)
directory_path = '/Chatbot/database/chroma/'
is_directory_exists = os.path.isdir(directory_path)

print(f"facts_path? {facts_path}")
print(f"emb_path {emb_path}")

warnings.filterwarnings("ignore", category=DeprecationWarning)

load_dotenv()

embeddings = OpenAIEmbeddings()
# emb = embeddings.embed_query("hi there")

# print(emb)

text_splitter = CharacterTextSplitter(separator="\n",
                                      chunk_size=200,
                                      chunk_overlap=0)
loader = TextLoader(str(facts_path / "test_data.txt"))
docs = loader.load_and_split(text_splitter=text_splitter)
db = Chroma.from_documents(docs,
                           embedding=embeddings,
                           persist_directory=str(emb_path))
results = db.similarity_search_with_score(
    "What is an interesting fact abaout English language?", k=3)

for result in results:
    print("\n")
    print(result[1])
    print(result[0].page_content)
