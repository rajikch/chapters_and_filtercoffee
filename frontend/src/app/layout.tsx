import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair-display" 
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FDFCFB] min-h-screen">
        <header className="flex justify-between items-start px-12 py-10 max-w-7xl mx-auto">
          
          {/* Left Side: Identity & Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-[#9FB0AA] uppercase tracking-[0.3em] text-[10px] font-bold">
              Montréal // 2026
            </span>
            <nav className="flex gap-12 text-[#2C1810] text-sm font-serif italic">
              <Link href="/about" className="hover:line-through decoration-[#6b8e23]">About</Link>
              <Link href="/archive" className="hover:line-through decoration-[#6b8e23]">Archive</Link>
              <Link href="/coffee_admin" className="hover:line-through decoration-[#6b8e23]">The Librarian's Desk</Link>
            </nav>
          </div>

          {/* Right Side: The CFC Logo Mark */}
          <div className="flex flex-col items-end border-r-2 border-[#6b8e23] pr-5 py-1">
            <span className="text-3xl tracking-[0.3em] text-[#2C1810] font-serif leading-none">CFC</span>
            <div className="flex items-center gap-2 mt-3 opacity-80">
              {/* Mini Book Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5D4037" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              {/* Mini Coffee Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5D4037" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
              {/* Custom Beans */}
              <div className="flex gap-0.5">
                <div className="w-1 h-1.5 bg-[#5D4037] rounded-full rotate-45"></div>
                <div className="w-1 h-1.5 bg-[#5D4037] rounded-full -rotate-12"></div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}