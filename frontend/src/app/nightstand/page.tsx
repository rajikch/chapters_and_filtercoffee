'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { styles } from '../coffee_admin/styles'; 

export default function NightstandPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [activeShelf, setActiveShelf] = useState<'Veda' | 'Amma'>('Veda');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const booksPerPage = 12;

  useEffect(() => {
    async function fetchNightstand() {
      setIsLoading(true);
      const { data } = await supabase.from('wishlist').select('*').order('created_at', { ascending: false });
      if (data) setWishlist(data);
      setIsLoading(false);
    }
    fetchNightstand();
  }, []);

  const filteredBooks = wishlist.filter(i => i.category === activeShelf);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  return (
    <main className={styles.container}>
      <header className="mb-20 text-center space-y-4">
        <h1 className="text-[6vh] font-serif font-light leading-tight text-[#1a3a3a]">
          Next on our <span className="italic">Nightstand</span>
        </h1>
        <p className="font-serif italic text-[#5D4037]/60 text-lg">A growing archive of future stories.</p>
      </header>

      <div className="flex justify-center mb-16">
        <div className={styles.shelfSwitcher}>
          {['Veda', 'Amma'].map((shelf) => (
            <button 
              key={shelf}
              onClick={() => {setActiveShelf(shelf as any); setCurrentPage(1);}} 
              className={`${styles.switcherBtn} ${activeShelf === shelf ? (shelf === 'Veda' ? styles.switcherActiveVeda : styles.switcherActiveAmma) : styles.switcherInactive}`}
            >
              {shelf}'s Nightstand
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 italic opacity-20 font-serif">Gathering the library...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16">
          {currentBooks.map((item) => (
            <div key={item.id} className={styles.wishlistCard} onMouseEnter={() => setHoveredNote(item.id)} onMouseLeave={() => setHoveredNote(null)}>
              {item.notes && (
                <>
                  <div className={styles.notesTrigger}>✎</div>
                  {hoveredNote === item.id && (
                    <div className={styles.notesBubble}>
                      <span className={styles.bubbleText}>{item.notes}</span>
                      <div className={styles.bubbleArrow} />
                    </div>
                  )}
                </>
              )}
              
              {/* FIXED IMAGE LOGIC: Prevents empty string error */}
              <div className="aspect-[3/4] overflow-hidden mb-6 shadow-sm bg-white flex items-center justify-center border border-[#e5e1da]">
                {item.cover_url && item.cover_url !== "" ? (
                  <img 
                    src={item.cover_url} 
                    className={`w-full h-full object-cover transition-all duration-1000 ${activeShelf === 'Amma' ? 'grayscale contrast-125' : ''}`} 
                    alt={item.title} 
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="font-serif italic text-[#a8a29e] text-lg opacity-40">{item.title.charAt(0)}</span>
                    <span className="block text-[8px] uppercase tracking-widest text-[#d1ccc0] mt-2">No Cover</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg leading-tight text-[#1a3a3a] font-normal">{item.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#78716c] font-normal">{item.author}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {Array.isArray(item.tags) ? item.tags.map((tag: string) => (
                  <span key={tag} className={`${styles.tagPill} ${activeShelf === 'Veda' ? styles.tagVeda : styles.tagAmma}`}>{tag}</span>
                )) : item.tags && (
                  <span className={`${styles.tagPill} ${activeShelf === 'Veda' ? styles.tagVeda : styles.tagAmma}`}>{item.tags}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0,0);}} className={styles.pageBtn}>← Previous</button>
          <span className="text-[10px] uppercase text-[#2f4f4f] tracking-widest">Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1); window.scrollTo(0,0);}} className={styles.pageBtn}>Next →</button>
        </div>
      )}
    </main>
  );
}