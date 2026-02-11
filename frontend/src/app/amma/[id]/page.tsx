import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function AmmaReviewPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: book } = await supabase.from('books').select('*').eq('id', id).single();

  if (!book) return <div className="p-20 italic text-center opacity-40">Steeping...</div>;

  return (
    <main className="min-h-screen">
      <nav className="p-6 lg:px-24 lg:py-12 flex justify-between items-baseline max-w-7xl mx-auto">
        <Link href="/about" className="label-classic opacity-40 hover:opacity-100 transition-all">← Return</Link>
        <span className="italic text-lg text-[var(--sage-accent)]">The Morning Desk</span>
      </nav>

      <section className="max-w-5xl mx-auto px-6 lg:px-0 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start">
          <div className="order-2 lg:order-1">
            <article className="mb-20">
              <span className="label-classic block mb-10">Amma’s Marginalia</span>
              <div className="max-w-prose space-y-8">
                {book.my_review?.split('\n').map((p: string, i: number) => (
                  <p key={i} className={`prose-classic ${i === 0 ? 'drop-cap-sage' : ''}`}>{p}</p>
                ))}
              </div>
            </article>

            {/* Ritual Endnote */}
            <div className="max-w-md pt-12 border-t border-[#F5E8E0] space-y-10">
              <div className="space-y-2">
                <span className="label-classic !text-[var(--rose-accent)]">The Morning Pairing</span>
                <h2 className="text-2xl lg:text-3xl italic text-[#5D4037]">{book.chai_pairing}</h2>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="label-classic !text-[8px] opacity-40 mb-3">Brew Strength</span>
                  <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`brew-line ${i < book.spice_level ? 'bg-[#5D4037]' : 'bg-[#2C1810]/10'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] uppercase tracking-[0.1em] opacity-40 italic mt-4">— {book.spice_level > 3 ? "A Bold Decoction" : "A Gentle Steeping"}</p>
              </div>
            </div>
          </div>

          <aside className="order-1 lg:order-2 lg:sticky lg:top-12">
            <div className="bg-white p-5 border border-[#F5E8E0] shadow-sm text-center lg:text-left">
              <img src={book.cover_url} alt={book.title} className="w-full h-auto mb-6 grayscale-[0.2]" />
              <p className="text-[17px] font-medium leading-tight mb-2">{book.title}</p>
              <p className="label-classic !tracking-widest opacity-50">{book.author}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}