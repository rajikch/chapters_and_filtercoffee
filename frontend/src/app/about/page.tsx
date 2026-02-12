'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AboutPage() {
  const [activeChoice, setActiveChoice] = useState<'veda' | 'amma'>('veda');
  const [vedaDB, setVedaDB] = useState<any>(null);
  const [ammaDB, setAmmaDB] = useState<any>(null);

  useEffect(() => {
    async function fetchPicks() {
      const veda = await supabase
        .from('books')
        .select('*')
        .eq('is_vedas_pick', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (veda.data) setVedaDB(veda.data);

      const amma = await supabase
        .from('books')
        .select('*')
        .eq('is_vedas_pick', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (amma.data) setAmmaDB(amma.data);
    }
    fetchPicks();
  }, []);

  const content = {
    veda: vedaDB ? {
      title: vedaDB.title,
      meta: `${vedaDB.author} • Veda's Pick`,
      image: vedaDB.cover_url,
      accent: "bg-[#DAA2A1]",
      label: "The Nursery Shelf",
      link: `/veda/${vedaDB.id}`
    } : null,
    amma: ammaDB ? {
      title: ammaDB.title,
      meta: `${ammaDB.author} • Morning Desk`,
      image: ammaDB.cover_url,
      accent: "bg-[#9FB0AA]",
      label: "The Morning Desk",
      link: `/amma/${ammaDB.id}`
    } : null
  };

  const active = activeChoice === 'veda' ? content.veda : content.amma;

  return (
    <main className="h-screen w-full bg-[#FDFCFB] text-[#2C1810] overflow-hidden flex flex-col">
      <nav className="flex justify-between items-center px-12 py-8 uppercase tracking-[0.3em] text-[10px] font-bold">
        <span className="text-[#9FB0AA]">Montréal // 2026</span>
        <div className="flex gap-12 text-[#2C1810]">
          <Link href="/about" className="hover:line-through">About</Link>
          <Link href="/archive" className="hover:line-through">Archive</Link>
        </div>
      </nav>

      <section className="flex-1 grid lg:grid-cols-2 px-12 pb-12 gap-12 items-center">
        {/* Left: Branding & Intro */}
        <div className="flex flex-col justify-center max-w-xl">
          <h1 className="text-[10vh] font-serif leading-[0.9] mb-8 tracking-tighter">
            Chapters <br /> 
            <span className="italic text-[#5D4037] ml-8">& Filter Coffee</span>
          </h1>

          {/* NEW: The Website Note */}
          <div className="max-w-md ml-8 space-y-4">
            <p className="font-serif text-lg leading-relaxed text-[#2C1810]/70 italic">
              A dual-archive of a life in Montreal. This is a quiet corner dedicated to my little one's 
              growing nursery shelf and my own morning desk reflections where literature 
              meets the slow ritual of a daily brew.
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9FB0AA]">
              Curating childhood & marginalia.
            </p>
          </div>
          
          <div className="mt-16 flex items-center gap-10">
            <button 
              onClick={() => setActiveChoice('veda')}
              className={`flex flex-col items-start transition-all cursor-pointer ${activeChoice === 'veda' ? 'opacity-100' : 'opacity-30'}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">The Nursery Shelf</span>
              <span className={`h-[1px] bg-[#DAA2A1] transition-all duration-500 ${activeChoice === 'veda' ? 'w-12' : 'w-0'}`}></span>
            </button>

            <button 
              onClick={() => setActiveChoice('amma')}
              className={`flex flex-col items-start transition-all cursor-pointer ${activeChoice === 'amma' ? 'opacity-100' : 'opacity-30'}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">The Morning Desk</span>
              <span className={`h-[1px] bg-[#9FB0AA] transition-all duration-500 ${activeChoice === 'amma' ? 'w-12' : 'w-0'}`}></span>
            </button>
          </div>
        </div>

        {/* Right: The Square Card */}
        <div className="flex justify-center items-center">
          {active ? (
            <div className="shelf-card">
              <div className="shelf-image-wrapper">
                <img 
                  key={activeChoice}
                  src={active.image} 
                  alt={active.title} 
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700"
                />
                <div className={`shelf-label-strip ${active.accent}`}>
                  Reading From: {active.label}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-end">
                <div className="max-w-[70%]">
                  <h3 className="font-serif text-2xl leading-tight">{active.title}</h3>
                  <p className={`text-[9px] uppercase tracking-widest font-bold ${activeChoice === 'veda' ? 'text-[#DAA2A1]' : 'text-[#9FB0AA]'}`}>
                    {active.meta}
                  </p>
                </div>
                <Link href={active.link} className="shelf-action-btn">→</Link>
              </div>
            </div>
          ) : (
            <div className="font-serif italic opacity-20">Gathering the library...</div>
          )}
        </div>
      </section>
    </main>
  );
}