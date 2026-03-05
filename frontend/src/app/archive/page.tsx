import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function LibraryArchive({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const ITEMS_PER_PAGE = 30; // 15 for Amma, 15 for Veda roughly
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { count } = await supabase
    .from('books')
    .select('*', { count: 'exact', head: true });

  const { data: allBooks } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  const ammaBooks = allBooks?.filter(b => !b.is_vedas_pick) || [];
  const vedaBooks = allBooks?.filter(b => b.is_vedas_pick) || [];
  
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-[#2C1810] font-serif selection:bg-[#6b8e23]/10">
      
      {/* HEADER: Compact & Refined */}
      <header className="px-6 lg:px-20 py-12 border-b border-[#2C1810]/5 flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-[0.6em] opacity-40 font-sans block">గ్రంథాలయ సూచిక</span>
          <h1 className="text-4xl lg:text-5xl italic tracking-tighter leading-none">The Master Ledger.</h1>
        </div>
        <div className="text-right hidden sm:block">
           <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 font-sans tracking-widest">Folio {currentPage.toString().padStart(2, '0')}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: THE STUDY (AMMA) */}
        <section>
          <div className="sticky top-0 bg-[#FBF9F6] pt-2 pb-6 z-20 border-b border-[#2C1810]/10 mb-10 flex justify-between items-baseline">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-[#6B8E23]">01. The Study</h2>
            <span className="text-[8px] opacity-30 font-sans tracking-[0.2em]">AMMA</span>
          </div>

          <div className="space-y-10">
            {ammaBooks.map((book) => (
              <Link key={book.id} href={`/amma/${book.id}`} className="group block border-b border-[#2C1810]/5 pb-8 last:border-0">
                <article className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-2xl italic leading-tight group-hover:text-[#6B8E23] transition-colors duration-500">
                      {book.title}
                    </h3>
                    <span className="text-[8px] font-sans opacity-20 uppercase tracking-tighter">{new Date(book.created_at).getFullYear()}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-sans italic">{book.author}</p>
                  
                  {book.chai_pairing && (
                    <div className="border-l border-[#6B8E23]/30 pl-4 py-0.5">
                      <p className="text-[14px] leading-relaxed opacity-70 italic line-clamp-2">
                        “{book.chai_pairing}”
                      </p>
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN: THE NURSERY (VEDA) */}
        <section>
          <div className="sticky top-0 bg-[#FBF9F6] pt-2 pb-6 z-20 border-b border-[#2C1810]/10 mb-10 flex justify-between items-baseline">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-[#8BA65A]">02. The Nursery</h2>
            <span className="text-[8px] opacity-30 font-sans tracking-[0.2em]">VEDA</span>
          </div>

          <div className="space-y-10">
            {vedaBooks.map((book) => (
              <Link key={book.id} href={`/veda/${book.id}`} className="group block border-b border-[#2C1810]/5 pb-8 last:border-0">
                <article className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-2xl italic leading-tight group-hover:text-[#8BA65A] transition-colors duration-500">
                      {book.title}
                    </h3>
                    <span className="text-[8px] font-sans opacity-20 uppercase tracking-tighter">{new Date(book.created_at).getFullYear()}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-sans italic">{book.author}</p>
                  
                  {book.my_review && (
                    <div className="border-l border-[#8BA65A]/30 pl-4 py-0.5">
                      <p className="text-[14px] leading-relaxed opacity-60 italic line-clamp-2">
                        {book.my_review.split('.')[0]}.
                      </p>
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* COMPACT PAGINATION */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-20 py-16 border-t border-[#2C1810]/5 flex justify-center items-center">
        <div className="flex gap-8 items-center font-sans">
          {currentPage > 1 && (
            <Link href={`/archive?page=${currentPage - 1}`} className="text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all">
              ← Prev
            </Link>
          )}

          <div className="flex gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={`/archive?page=${p}`} className={`text-[10px] ${p === currentPage ? 'font-bold underline' : 'opacity-20 hover:opacity-100'}`}>
                {p}
              </Link>
            ))}
          </div>

          {currentPage < totalPages && (
            <Link href={`/archive?page=${currentPage + 1}`} className="text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all">
              Next →
            </Link>
          )}
        </div>
      </footer>
    </main>
  );
}