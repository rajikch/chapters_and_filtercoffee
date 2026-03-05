import Link from 'next/link';

interface ArticleProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticleProps) {
  // Now TypeScript knows that params.slug exists and is a string!
  const { slug } = params;

  const res = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/thebrewedchapter.wordpress.com/posts?per_page=1&_embed`
  );
  
  const posts = await res.json();
  const post = posts[0];

  if (!post) return <div className="p-20 text-center font-serif italic">Opening the archives...</div>;

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <article className="max-w-4xl mx-auto px-6 py-20 bg-[#FDFCFB]">
      {/* Featured Image as a soft-focus cover */}
      {featuredImage && (
        <div className="mb-12">
          <img 
            src={featuredImage} 
            alt={post.title.rendered} 
            className="w-full h-[65vh] object-cover rounded-sm shadow-sm opacity-95" 
          />
        </div>
      )}

      <header className="text-center mb-16">
        <span className="uppercase tracking-[0.4em] text-[10px] text-[#8b735b] mb-4 block">
          The Brewed Chapter
        </span>
        <h1 
          className="eb-garamond-bold text-5xl md:text-6xl text-[#2c1810] leading-tight mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="h-[1px] w-12 bg-[#8b735b] mx-auto mb-6 opacity-50"></div>
        
        {/* Swapped "A Story for Veda" with the dynamic excerpt from WordPress */}
        <div 
          className="italic text-[#5a4a42] font-serif max-w-xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
        />
      </header>

      {/* This class "magazine-content" uses the CSS we wrote to fix word-breaking */}
      <div 
        className="magazine-content max-w-2xl mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
      />

      {/* Connected Archive Link Section */}
      <footer className="max-w-2xl mx-auto mt-20 pt-10 border-t border-black/5 text-center">
        <Link 
          href="/archive" 
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8b735b] hover:opacity-60 transition-opacity"
        >
          → View the Full Deep Dive Archives
        </Link>
      </footer>
    </article>
  );
}