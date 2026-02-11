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
    print("\n--- 📚 Chapters & Filter Coffee: Entry Portal ---")
    
    # A. Search Inputs
    query = input("Book Title & Author: ")
    shelf = input("Shelf? (v for Veda / a for Amma): ").lower()
    is_veda = (shelf == 'v')
    
    # B. Fetch Metadata
    resp = requests.get(f"https://www.googleapis.com/books/v1/volumes?q={query}").json()
    if 'items' not in resp:
        print("❌ Book not found!")
        return
    
    volume = resp['items'][0]['volumeInfo']
    title = volume.get('title')
    
    # C. Lifestyle Inputs (The Soul)
    print(f"\n✨ Editing Entry for: {title}")
    
    # Amma's Critique
    review = input("\nAmma's Marginalia (The Review):\n> ")
    
    # Veda's Moment (Only if it's her shelf)
    vedas_reaction = None
    if is_veda:
        vedas_reaction = input("\nThe Nursery Note (Veda's reaction/moment):\n> ")
    
    pairing = input("\nDrink Pairing (e.g., A cold Nana Smoothie): ")
    
    tags_input = input("Vibe Tags (comma-separated): ")
    tags_list = [t.strip() for t in tags_input.split(",")]
    
    try:
        spice = int(input("Spice Level (0-5): "))
    except ValueError:
        spice = 0

    # D. Image Optimization
    # Replacing zoom=1 with zoom=2 or 3 often fetches a higher-res cover
    thumb = volume.get('imageLinks', {}).get('thumbnail', '')
    high_res_cover = thumb.replace("http:", "https:").replace("zoom=1", "zoom=2")

    # E. Map to your SQL Schema
    book_data = {
        "title": title,
        "author": ", ".join(volume.get('authors', [])),
        "category": "Nursery" if is_veda else "Morning Desk",
        "cover_url": high_res_cover,
        "my_review": review,
        "vedas_reaction": vedas_reaction,
        "vibe_tags": tags_list,
        "chai_pairing": pairing,
        "spice_level": spice,
        "is_vedas_pick": is_veda
    }

    # F. Insert
    try:
        supabase.table("books").insert(book_data).execute()
        print(f"\n✅ Successfully added to the {book_data['category']} Chronicles!")
    except Exception as e:
        print(f"\n❌ Database Error: {e}")

if __name__ == "__main__":
    add_new_book()