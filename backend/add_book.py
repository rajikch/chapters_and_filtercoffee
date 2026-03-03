import os
import requests
from dotenv import load_dotenv
from supabase import create_client
from pathlib import Path

# 1. Setup Path & Load Env
env_path = Path(__file__).resolve().parent.parent / '.env.local'
load_dotenv(dotenv_path=env_path)

supabase = create_client(
    os.getenv("NEXT_PUBLIC_SUPABASE_URL"), 
    os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
)

def add_new_book():
    print("\n--- 📚 Chapters & Filter Coffee: Open Library Portal ---")
    
    # A. Search Inputs
    query = input("Book Title & Author: ")
    shelf = input("Shelf? (v for Veda / a for Amma): ").lower()
    is_veda = (shelf == 'v')
    
    # B. Fetch Metadata from Open Library (No Key Needed!)
    # We use search.json with a limit of 1 to get the best match
    search_url = f"https://openlibrary.org/search.json?q={query}&limit=1"
    resp = requests.get(search_url).json()
    
    if not resp.get('docs'):
        print("❌ Book not found on Open Library!")
        return
    
    book_data_api = resp['docs'][0]
    title = book_data_api.get('title')
    author = ", ".join(book_data_api.get('author_name', ['Unknown Author']))
    
    # Open Library uses 'cover_i' (ID) to generate image URLs
    cover_id = book_data_api.get('cover_i')
    if cover_id:
        high_res_cover = f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
    else:
        high_res_cover = ""

    print(f"\n✨ Found: {title} by {author}")
    
    # C. Lifestyle Inputs (The Soul)
    review = input("\nYour Marginalia (The Review):\n> ")
    vedas_reaction = input("\nThe Nursery Note (Veda's reaction):\n> ") if is_veda else None
    pairing = input("\nDrink Pairing (e.g., A cold Nana Smoothie): ")
    
    tags_input = input("Vibe Tags (comma-separated): ")
    tags_list = [t.strip() for t in tags_input.split(",")]
    
    try:
        spice = int(input("Spice Level (0-5): "))
    except ValueError:
        spice = 0

    # D. Map to your SQL Schema
    book_data = {
        "title": title,
        "author": author,
        "category": "Veda" if is_veda else "Amma",
        "cover_url": high_res_cover,
        "my_review": review,
        "vedas_reaction": vedas_reaction,
        "vibe_tags": tags_list,
        "chai_pairing": pairing,
        "spice_level": spice,
        "is_vedas_pick": is_veda
    }

    # E. Insert
    try:
        supabase.table("books").insert(book_data).execute()
        print(f"\n✅ Successfully added {title} to the library!")
    except Exception as e:
        print(f"\n❌ Database Error: {e}")

if __name__ == "__main__":
    add_new_book()