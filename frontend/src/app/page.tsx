'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const [vedaBook, setVedaBook] = useState<any>(null);
  const [ammaBook, setAmmaBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPicks() {
      console.log("Fetching fresh picks from Supabase...");
      
      // Fetch Veda's latest
      const veda = await supabase
        .from('books')
        .select('*')
        .eq('is_vedas_pick', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      // Fetch Amma's latest
      const amma = await supabase
        .from('books')
        .select('*')
        .eq('is_vedas_pick', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (veda.data) {
        console.log("Veda Book Found:", veda.data.title);
        setVedaBook(veda.data);
      }
      
      if (amma.data) {
        console.log("Amma Book Found:", amma.data.title);
        setAmmaBook(amma.data);
      } else {
        console.log("No Amma book found with is_vedas_pick = false");
      }
      
      setLoading(false);
    }
    fetchPicks();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center font-serif italic opacity-30">
      Steeping...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FDFCFB] p-8 lg:p-24 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-20 lg:gap-32">
        
        {/* Veda Card */}
        {vedaBook && (
          <div className="relative group">
            <div className="bg-white p-6 lg:p-10 border border-[#2C1810]/5 shadow-sm">
               <div className="aspect-[3/4] overflow-hidden bg-[#F5E8E0]/20 mb-8">
                  <img src={vedaBook.cover_url} className="w-full h-full object-contain" />
               </div>
               <div className="space-y-2">
                 <p className="text-[9px] font-bold text-[#DAA2A1] uppercase tracking-[0.4em]">The Nursery Choice</p>
                 <h2 className="font-serif text-3xl italic text-[#2C1810]">{vedaBook.title}</h2>
               </div>
            </div>
            <Link href={`/veda/${vedaBook.id}`} className="absolute -bottom-6 -right-4 bg-[#DAA2A1] text-white p-6 shadow-xl hover:-translate-y-1 transition-transform">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] mb-1 opacity-80 text-white">Chapters & Chai</p>
              <p className="font-serif italic text-lg lg:text-xl text-white">Read Veda's Note →</p>
            </Link>
          </div>
        )}

        {/* Amma Card */}
        {ammaBook && (
          <div className="relative group mt-16 lg:mt-0">
            <div className="bg-white p-6 lg:p-10 border border-[#2C1810]/5 shadow-sm">
               <div className="aspect-[3/4] overflow-hidden bg-[#F5E8E0]/20 mb-8">
                  <img src={ammaBook.cover_url} className="w-full h-full object-contain" />
               </div>
               <div className="space-y-2">
                 <p className="text-[9px] font-bold text-[#9FB0AA] uppercase tracking-[0.4em]">The Morning Desk</p>
                 <h2 className="font-serif text-3xl italic text-[#2C1810]">{ammaBook.title}</h2>
               </div>
            </div>
            <Link href={`/amma/${ammaBook.id}`} className="absolute -bottom-6 -right-4 bg-[#9FB0AA] text-white p-6 shadow-xl hover:-translate-y-1 transition-transform">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] mb-1 opacity-80 text-white">Chapters & Filter Coffee</p>
              <p className="font-serif italic text-lg lg:text-xl text-white">Read Amma's Review →</p>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}