'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DeskToggle({ amma, veda }: { amma: any, veda: any }) {
  // Amma is default
  const [active, setActive] = useState<'amma' | 'veda'>('amma');
  
  const current = active === 'amma' ? amma : veda;
  
  // NAVIGATION LOGIC: Builds the path for your existing dynamic routes
  const targetLink = active === 'amma' 
    ? `/amma/${current?.id}` 
    : `/veda/${current?.id}`;

  return (
    <div className="flex flex-col items-start">
      {/* SWITCHER LABELS */}
      <div className="flex gap-4 mb-8 text-[9px] uppercase tracking-[0.2em] font-bold">
        <button 
          onClick={() => setActive('amma')}
          className={`pb-1 transition-all ${active === 'amma' ? 'text-[#2C1810] border-b-2 border-[#2C1810]' : 'opacity-20'}`}
        >
          Amma
        </button>
        <button 
          onClick={() => setActive('veda')}
          className={`pb-1 transition-all ${active === 'veda' ? 'text-[#829385] border-b-2 border-[#829385]' : 'opacity-20'}`}
        >
          Veda
        </button>
      </div>

      {/* THE BOOK DISPLAY */}
      {current ? (
        <Link href={targetLink} className="group flex flex-col items-start">
          <div className={`relative w-full aspect-[2/3] max-w-[200px] bg-stone-200 shadow-lg overflow-hidden transition-all duration-700 ${active === 'veda' ? 'rounded-tr-[50px]' : 'rounded-sm'}`}>
            <img 
              src={current.cover_url} 
              alt={current.title}
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="mt-4 max-w-[200px]">
            <p className="font-serif italic text-lg text-[#2C1810] leading-tight">{current.title}</p>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">{current.author}</p>
          </div>
        </Link>
      ) : (
        <div className="text-[10px] italic opacity-30">No books found in this section.</div>
      )}
    </div>
  );
}