export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#2C1810] px-12 py-20">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header Section */}
        <section className="space-y-6">
          <h1 className="text-5xl font-serif italic text-[#5D4037]">A Note From the Desk</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#9FB0AA]">
            Sainte-Marthe-sur-le-Lac // February 2026
          </p>
        </section>

        {/* Story Section */}
        <section className="font-serif text-xl leading-relaxed space-y-8 text-[#2C1810]/90">
          <p>
            I started <span className="italic">Chapters & Filter Coffee</span> as a dual-archive. 
            Living in the Montreal area, life often moves between the vibrant rush of the city 
            and the slow, quiet rituals we build at home.
          </p>

          <p>
            One half of this space belongs to <span className="text-[#DAA2A1]">Veda</span>. 
            It is a digital shelf for her growing nursery library—a place to track the stories 
            that shape her first years and the wonder found in every page we turn together.
          </p>

          <p>
            The other half is my own. <span className="text-[#9FB0AA]">The Morning Desk</span> is where 
            literature meets my daily brew. As a Telugu woman, the ritual of coffee is 
            intertwined with my morning reflections, marginalia, and the books that 
            demand a second look.
          </p>
        </section>

        {/* Closing */}
        <footer className="pt-12 border-t border-[#eeeae4]">
          <p className="text-sm italic text-[#8c857b]">
            Thank you for being part of this quiet corner.
          </p>
        </footer>
      </div>
    </main>
  );
}