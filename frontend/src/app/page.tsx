import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DeskToggle from '@/app/components/DeskToggle';

export default async function HomePage() {
  // 1. Fetch Deep Dives from Supabase (The "Now Reading" section)
  const { data: books } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  // Filter for Amma and Veda's latest picks
  const latestAmma = books?.find(b => !b.is_vedas_pick);
  const latestVeda = books?.find(b => b.is_vedas_pick);

  // 2. Fetch WordPress Articles
  // We fetch the latest 10 posts. revalidate: 0 ensures instant updates when you publish.
  const wpRes = await fetch(
    'https://public-api.wordpress.com/wp/v2/sites/thebrewedchapter.wordpress.com/posts?_embed&per_page=10',
    { next: { revalidate: 0 } } 
  );
  const articles = await wpRes.json();

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#2C1810]">
      {/* --- SITE HEADER --- */}
      <header className="px-6 pt-20 pb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight mb-4 hover:opacity-70 transition-opacity">
            Chapters & Filter Coffee
          </h1>
        </Link>
        <p className="max-w-xl mx-auto font-serif text-lg opacity-60 leading-relaxed italic">
          A Montreal library log.
        </p>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-16">
        
        {/* LEFT COLUMN: THE DESK (Now Reading) */}
        <aside className="md:w-1/3 lg:w-1/4">
          <div className="md:sticky md:top-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-8">
              Now Reading
            </h3>
            <DeskToggle amma={latestAmma} veda={latestVeda} />
          </div>
        </aside>

        {/* RIGHT COLUMN: THE RIVER (Blog Feed) */}
        <section className="md:w-2/3 lg:w-3/4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-8">
            The River
          </h3>
          <div className="space-y-16">
            {articles.map((article: any) => (
              <div key={article.id} className="group border-t border-black/5 pt-8">
                {/* CRITICAL FIX: We link via ID because your WP plan 
                  doesn't support custom slugs in the API 
                */}
                <Link href={`/articles/${article.id}`} className="block">
                  <h2 
                    className="text-2xl md:text-3xl font-serif italic mb-4 group-hover:text-[#829385] transition-colors"
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  />
                  <div 
                    className="font-serif text-base opacity-70 leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                  />
                  <div className="mt-6 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 text-[#829385] transition-all">
                    Read Chapter →
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-black/5 grid grid-cols-1 md:grid-cols-2 gap-12 opacity-80 text-sm mt-20">
        <div className="group">
          <h3 className="font-serif italic text-xl mb-2 text-[#2C1810]">The Library Guide</h3>
          <p className="mb-4 text-[#5a4a42] opacity-70">Resources for Montreal readers and Kobo users.</p>
          {/* Replace '7' with your actual 'Montreal Library Guide' post ID */}
          <Link href="/articles/7" className="font-bold uppercase text-[10px] tracking-widest border-b border-[#829385]/30 group-hover:border-[#829385] text-[#829385] transition-all">
            View Guide
          </Link>
        </div>
        
        <div className="group">
          <h3 className="font-serif italic text-xl mb-2 text-[#2C1810]">The Shopping List</h3>
          <p className="mb-4 text-[#5a4a42] opacity-70">Curated books for children and home collections.</p>
          <Link href="/edit" className="font-bold uppercase text-[10px] tracking-widest border-b border-[#829385]/30 group-hover:border-[#829385] text-[#829385] transition-all">
            Browse List
          </Link>
        </div>
      </footer>
    </main>
  );
}