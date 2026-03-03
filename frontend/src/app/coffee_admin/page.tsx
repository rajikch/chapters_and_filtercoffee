'use client';

import { useState } from 'react';

export default function AdminPortal() {
  const [passkey, setPasskey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- Stage 1: Search State ---
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- Stage 2: Draft State (The Selected Book) ---
  const [draft, setDraft] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const checkPasskey = () => {
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsAuthorized(true);
    } else {
      alert("Wrong brew! Access denied.");
    }
  };

  // 1. HIT THE PYTHON SEARCH
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:8000/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      alert("Python server not running! Check uvicorn.");
    } finally {
      setIsSearching(false);
    }
  };

  // 2. CAPTURE SELECTION
  const selectBook = (book: any) => {
    setDraft({
      ...book,
      category: 'Amma', // Default
      my_review: '',
      vedas_reaction: '',
      chai_pairing: '',
      spice_level: 0,
      vibe_tags: '',
      is_vedas_pick: false
    });
    setResults([]);
  };

  // 3. HIT THE PYTHON ADD
  const handleSave = async () => {
    setIsSaving(true);
    const finalData = {
      ...draft,
      vibe_tags: draft.vibe_tags.split(',').map((t: string) => t.trim())
    };

    const res = await fetch('http://localhost:8000/api/add-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });

    if (res.ok) {
      alert("✅ Added to Chronicles!");
      setDraft(null);
      setQuery('');
    }
    setIsSaving(false);
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf7] text-[#4a3f35]">
        <h1 className="text-2xl font-serif mb-4">Chapters & Filter Coffee Admin</h1>
        <input 
          type="password" 
          placeholder="Enter Secret Passkey"
          className="p-2 border border-[#d1ccc0] rounded mb-2 bg-white outline-none focus:ring-2 focus:ring-[#6b8e23]"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        <button onClick={checkPasskey} className="bg-[#6b8e23] text-white px-6 py-2 rounded hover:bg-[#556b2f] transition">
          Enter Library
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#fdfaf7] min-h-screen font-serif max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-[#2f4f4f]">Welcome, Librarian.</h1>
        <button onClick={() => setIsAuthorized(false)} className="text-xs text-gray-400 underline">Lock Desk</button>
      </div>
      
      {/* SEARCH SECTION */}
      {!draft && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <input 
              placeholder="Search for a book (e.g. Caterpillar)..."
              className="flex-1 p-3 border border-[#d1ccc0] rounded bg-white outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="bg-[#4a3f35] text-white px-6 py-3 rounded">
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((b: any, i) => (
              <div key={i} onClick={() => selectBook(b)} className="flex gap-4 p-4 border border-[#d1ccc0] bg-white hover:bg-[#f3f0e9] cursor-pointer transition">
                <img src={b.cover_url} className="w-12 h-16 object-cover shadow" alt="cover" />
                <div>
                  <p className="font-bold text-[#2f4f4f]">{b.title}</p>
                  <p className="text-sm text-gray-500 italic">{b.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT/ADD SECTION */}
      {draft && (
        <div className="bg-white p-8 border border-[#d1ccc0] shadow-md rounded-sm">
          <div className="flex gap-6 mb-8 border-b pb-6">
            <img src={draft.cover_url} className="w-24 h-32 shadow-xl" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-[#2f4f4f]">{draft.title}</h2>
                <button onClick={() => setDraft(null)} className="text-red-400 text-sm">Cancel</button>
              </div>
              <p className="italic text-gray-600">by {draft.author}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Shelf</label>
                <select 
                  className="w-full p-2 border border-[#d1ccc0]"
                  value={draft.category}
                  onChange={(e) => setDraft({...draft, category: e.target.value, is_vedas_pick: e.target.value === 'Veda'})}
                >
                  <option value="Amma">Amma's Morning Desk</option>
                  <option value="Veda">Veda's Nursery</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Spice Level (0-5)</label>
                <input type="number" className="w-full p-2 border border-[#d1ccc0]" onChange={(e) => setDraft({...draft, spice_level: parseInt(e.target.value)})} />
              </div>
            </div>

            <textarea 
              placeholder="Amma's Marginalia (The Review)..."
              className="w-full p-3 border border-[#d1ccc0] h-32"
              onChange={(e) => setDraft({...draft, my_review: e.target.value})}
            />

            {draft.category === 'Veda' && (
              <textarea 
                placeholder="The Nursery Note (Veda's reaction)..."
                className="w-full p-3 border border-[#d1ccc0] h-24 bg-[#fdfaf7] italic"
                onChange={(e) => setDraft({...draft, vedas_reaction: e.target.value})}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Drink Pairing (e.g. Nana Smoothie)..." className="p-2 border border-[#d1ccc0]" onChange={(e) => setDraft({...draft, chai_pairing: e.target.value})} />
              <input placeholder="Vibe Tags (comma separated)..." className="p-2 border border-[#d1ccc0]" onChange={(e) => setDraft({...draft, vibe_tags: e.target.value})} />
            </div>

            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-[#6b8e23] text-white py-4 font-bold rounded hover:bg-[#556b2f] transition"
            >
              {isSaving ? "SAVING..." : "ADD TO COLLECTION"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}