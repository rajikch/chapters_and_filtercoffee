'use client';

import { useState } from 'react';
import { styles } from './styles';
import { supabase } from '@/lib/supabase';
import Fuse from 'fuse.js';

export default function AdminPortal() {
  const [pass, setPass] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [bookDraft, setBookDraft] = useState<any>(null); 
  const [wishDraft, setWishDraft] = useState<any>(null); 
  const [showDraftingRoom, setShowDraftingRoom] = useState(false);

  // --- LOGIC FOR BOOK REVIEWS (Still in Supabase) ---
  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=30`);
      const data = await res.json();
      if (data.docs) {
        const formatted = data.docs
          .filter((b: any) => !b.title.toLowerCase().includes('study guide'))
          .map((b: any) => ({
            title: b.title,
            author: b.author_name ? b.author_name.join(', ') : 'Unknown',
            cover_url: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg` : null,
          }));
        setResults(formatted);
      }
    } finally { setIsSearching(false); }
  };

  const saveBookReview = async () => {
    const payload = {
      title: bookDraft.title,
      author: bookDraft.author,
      cover_url: bookDraft.cover_url || null,
      is_vedas_pick: bookDraft.is_vedas_pick,
      my_review: bookDraft.my_review,
      chai_pairing: bookDraft.chai_pairing || null,
      spice_level: bookDraft.spice_level || 3,
      subcategory: bookDraft.is_vedas_pick ? 'Nursery Shelf' : 'The Study',
    };
    const { error } = await supabase.from('books').insert([payload]);
    if (!error) { alert("Published to Archive."); setBookDraft(null); }
  };

  if (!isAuth) {
    return (
      <main className="min-h-screen w-full bg-[#FDFCFB] flex flex-col items-center justify-center px-6">
        <h1 className="text-[5vh] font-serif italic text-[#2C1810] mb-12 tracking-tighter">The Librarian's Desk</h1>
        <input 
          type="password" 
          className="w-64 bg-transparent border-b border-[#e5e1da] py-3 text-center outline-none font-serif italic text-[#2C1810]" 
          placeholder="Entry Key..." 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && pass.trim() === 'chai2026' && setIsAuth(true)}
        />
      </main>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.sectionHeader}>
        <h1 className={styles.h1}>The Librarian's Desk</h1>
        <button onClick={() => setIsAuth(false)} className="text-[10px] uppercase opacity-20">Lock Archive</button>
      </header>

      {!bookDraft && !showDraftingRoom ? (
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-6 border border-[#e5e1da]">
            <div className="flex-1 flex gap-4 w-full">
              <input className={styles.searchBar} placeholder="Scout a book to log..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
              <button className={styles.btnPrimary} onClick={handleSearch}>{isSearching ? "..." : "Scout"}</button>
            </div>
            <div className="italic opacity-40 font-serif">or</div>
            {/* NEW WORDPRESS BRIDGE */}
            <button 
              onClick={() => setShowDraftingRoom(true)}
              className="px-8 py-4 border border-[#829385] text-[#829385] text-[10px] uppercase tracking-widest hover:bg-[#829385] hover:text-white transition-colors"
            >
              The Drafting Room
            </button>
          </div>

          {/* Book Search Results */}
          <div className={styles.grid}>
            {results.map((b, i) => (
              <div key={i} className={styles.card}>
                <p className={styles.bookTitle}>{b.title}</p>
                <button onClick={() => setBookDraft({ ...b, is_vedas_pick: true })} className="text-[10px] uppercase tracking-widest text-[#6b8e23] mt-4">Deep Dive</button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* --- THE WORDPRESS DRAFTING ROOM --- */}
      {showDraftingRoom && (
        <section className="max-w-4xl mx-auto bg-white p-8 md:p-16 border border-[#e5e1da] shadow-sm text-center">
          <h2 className="font-serif italic text-3xl mb-4">The Drafting Room</h2>
          <p className="font-serif opacity-60 mb-12">WordPress is now your quill for long-form stories.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://wordpress.com/post/thebrewedchapter.wordpress.com" 
              target="_blank" 
              className="p-10 border border-dashed border-[#829385] group hover:bg-[#F4F7F5] transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">🖋️</span>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#829385]">Write New Article</p>
            </a>

            <a 
              href="https://wordpress.com/posts/thebrewedchapter.wordpress.com" 
              target="_blank" 
              className="p-10 border border-[#e5e1da] group hover:bg-stone-50 transition-all"
            >
              <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">📚</span>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Manage Archives</p>
            </a>
          </div>

          <button 
            onClick={() => setShowDraftingRoom(false)} 
            className="mt-16 text-[10px] uppercase tracking-[0.4em] opacity-30 hover:opacity-100"
          >
            ← Back to Librarian's Desk
          </button>
        </section>
      )}

      {/* --- BOOK REVIEW DRAFT (UNCHANGED) --- */}
      {bookDraft && (
        <section className="max-w-5xl mx-auto bg-white p-16 border border-[#e5e1da]">
          <h2 className="font-serif italic text-3xl mb-8">Logging: {bookDraft.title}</h2>
          <textarea 
            className="w-full h-48 p-6 bg-[#FDFCFB] border font-serif italic outline-none mb-8" 
            placeholder="Amma's Marginalia..." 
            value={bookDraft.my_review} 
            onChange={(e) => setBookDraft({...bookDraft, my_review: e.target.value})} 
          />
          <button className="w-full bg-[#2C1810] text-white py-6 uppercase tracking-widest" onClick={saveBookReview}>Log to Archive</button>
          <button onClick={() => setBookDraft(null)} className="w-full mt-4 text-[10px] uppercase opacity-20">Cancel</button>
        </section>
      )}
    </div>
  );
}