# 1. Setup Path & Load Env
import os
import requests
from dotenv import load_dotenv
from supabase import create_client
from pathlib import Path

script_path = Path(__file__).resolve()
root_dir = script_path.parent.parent
env_path = root_dir / '.env.local'

print(f"--- 🛠️ DEBUG START ---")
print(f"Looking for file at: {env_path}")
print(f"File exists: {env_path.exists()}")

# Load and manually print the keys (masked)
load_dotenv(dotenv_path=env_path)

# Let's list ALL environment variables starting with NEXT_
print("Scanning for NEXT_ variables...")
for key, value in os.environ.items():
    if key.startswith("NEXT_"):
        print(f"Found Key: {key} | Value starts with: {str(value)[:10]}...")

url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not url or not key:
    print("❌ ERROR: Keys still missing after scan.")
    exit(1)