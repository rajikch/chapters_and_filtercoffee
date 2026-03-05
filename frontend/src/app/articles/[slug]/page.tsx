import Link from 'next/link';

// 1. Explicitly define the props for Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  // 2. Await the params correctly
  const resolvedParams = await params;
  const id = resolvedParams.slug;

  // 3. Fetch from WordPress by ID
  // We use the direct ID endpoint which is the most reliable for free WP accounts
  const wpRes = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/thebrewedchapter.wordpress.com/posts/${id}?_embed`,
    { next: { revalidate: 0 } }
  );

  const post = await wpRes.json();

  // 4. Fallback if the ID doesn't exist (post.id will be missing)
  if (!post || !post.id) {
    return (
      <main className="min-h-screen bg-[#FDFCFB] px-6 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="font-serif italic text-2xl text-[#2C1810]">Chapter not found.</h1>
        <p className="opacity-60 text-[10px] uppercase tracking-[0.2em] mt-2 mb-8">
          The identifier "{id || 'none'}" returned no data.
        </p>
        <Link href="/" className="text-[#829385] border-b border-[#829385]/30 hover:border-[#829385] transition-all uppercase text-[10px] tracking-widest font-bold">
          Return to The River
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#2C1810] pb-20">
      {/* --- BACK BUTTON --- */}
      <header className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity mb-8 block">
          ← Back to the River
        </Link>
        
        <h1 
          className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div className="flex justify-center gap-4 text-[10px] uppercase tracking-widest opacity-40 font-bold">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>By Amma</span>
        </div>
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <div 
        className="magazine-content px-6 mx-auto max-w-[650px]"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <footer className="max-w-3xl mx-auto px-6 mt-20 pt-10 border-t border-black/5 text-center">
        <Link href="/" className="font-serif italic text-xl opacity-60 hover:opacity-100 transition-opacity">
          Chapters & Filter Coffee
        </Link>
      </footer>
    </main>
  );
}