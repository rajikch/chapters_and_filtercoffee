import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client
from pathlib import Path

# 1. Setup Env (Matches your add_book.py logic)
env_path = Path(__file__).resolve().parent.parent / '.env.local'
load_dotenv(dotenv_path=env_path)

app = FastAPI()

# 2. Handle CORS (Crucial so Next.js can talk to Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_client(
    os.getenv("NEXT_PUBLIC_SUPABASE_URL"), 
    os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
)

# 3. Data Model for the "Add" step
class BookEntry(BaseModel):
    title: str
    author: str
    category: str
    cover_url: str
    my_review: str
    vedas_reaction: str = None
    chai_pairing: str
    vibe_tags: list
    spice_level: int
    is_vedas_pick: bool

# 4. Search Endpoint (The "Scout")
@app.get("/api/search")
def search_books(q: str):
    # Hits Open Library to avoid the Google Quota
    url = f"https://openlibrary.org/search.json?q={q}&limit=5"
    resp = requests.get(url).json()
    
    results = []
    for item in resp.get('docs', []):
        cover_id = item.get('cover_i')
        results.append({
            "title": item.get('title'),
            "author": ", ".join(item.get('author_name', ['Unknown'])),
            "cover_url": f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg" if cover_id else ""
        })
    return results

# 5. Add Endpoint (The "Librarian")
@app.post("/api/add-book")
def add_book(entry: BookEntry):
    try:
        # Inserts directly into your 'books' table
        supabase.table("books").insert(entry.dict()).execute()
        return {"message": "Success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))