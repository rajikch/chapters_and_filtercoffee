import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AmmaReviewPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: book } = await supabase.from('books').select('*').eq('id', id).single();

  if (!book) return <div className="p-20 italic text-center opacity-40 font-serif">Steeping...</div>;

  const paragraphs = book.my_review?.split('\n') || [];
  const middleIndex = Math.ceil(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, middleIndex);
  const secondHalf = paragraphs.slice(middleIndex);

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#2C1810] font-serif selection:bg-[#6b8e23]/10">
      
      {/* Navigation */}
      <nav className="p-8 lg:px-16 flex justify-between items-baseline border-b border-[#2C1810]/5">
        <Link href="/archive" className="text-[10px] uppercase tracking-[0.4em] opacity-40 hover:opacity-100 font-sans transition-all">
          ← Library Archive
        </Link>
        <span className="text-[10px] uppercase tracking-[0.4em] opacity-20 font-sans">Montréal // 2026</span>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-24">
        
        {/* Header */}
        <header className="mb-20 text-center">
          <h1 className="text-5xl lg:text-6xl italic leading-tight mb-8 tracking-tighter text-[#0D0907]">
            {book.title}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] font-sans opacity-60 font-bold tracking-widest">{book.author}</p>
        </header>

        {/* THE VERDICT: Deepened & Visible (20px) */}
        {book.verdict && (
          <section className="mb-20 py-12 border-y border-[#2C1810]/10">
            <span className="text-[10px] uppercase tracking-[0.8em] text-[#6b8e23] font-bold font-sans block mb-6 text-center">
              The Verdict
            </span>
            <p className="text-[20px] italic leading-relaxed text-center max-w-2xl mx-auto text-[#0D0907] font-medium">
              “{book.verdict}”
            </p>
          </section>
        )}

        {/* BREW STRENGTH: Dark Espresso Bars */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-6 border transition-colors duration-500 ${
                  i < (book.spice_level || 1) 
                  ? 'bg-[#0D0907] border-[#0D0907]' // Deep, Visible Black-Brown
                  : 'bg-transparent border-[#2C1810]/10'
                }`} 
              />
            ))}
          </div>
          <span className="text-[9px] uppercase tracking-[0.5em] font-sans font-bold opacity-40">Infusion Strength</span>
        </div>

        {/* The Deep Dive: Part I (16px) */}
        <div className="max-w-2xl mx-auto">
          <section className="space-y-10 text-[16px] leading-[1.9] text-[#2C1810]/90">
            {firstHalf.map((p: string, i: number) => (
              <p key={i} className={i === 0 ? 'first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#6b8e23] first-letter:leading-none' : ''}>
                {p}
              </p>
            ))}
          </section>

          {/* THE ECHO: Deepened & Visible (20px Bridge) */}
          {book.chai_pairing && (
            <section className="my-20 py-16 border-y border-[#2C1810]/10 text-center bg-[#F4F1ED]/30">
               <span className="text-[10px] uppercase tracking-[1em] opacity-40 font-sans block mb-8 text-[#6b8e23] font-bold">The Echo</span>
               <blockquote className="text-[20px] italic leading-relaxed text-[#0D0907] max-w-lg mx-auto font-medium">
                 “{book.chai_pairing}”
               </blockquote>
            </section>
          )}

          {/* The Deep Dive: Part II (16px) */}
          <section className="space-y-10 text-[16px] leading-[1.9] text-[#2C1810]/90 pb-32">
            {secondHalf.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        </div>
      </article>

      <footer className="py-20 border-t border-[#2C1810]/5 text-center">
        <Link href="/archive" className="text-[10px] uppercase tracking-[0.8em] font-sans font-bold opacity-30 hover:opacity-100 transition-opacity">
          Close Chronicle
        </Link>
      </footer>
    </main>
  );
}