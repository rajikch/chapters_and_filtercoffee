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
      <body>
        {/* Your Original Navigation Block */}
        <header>
          <span className="text-[#9FB0AA]">Montréal // 2026</span>
          <div className="flex gap-12 text-[#2C1810]">
            <Link href="/about" className="hover:line-through">About</Link>
            <Link href="/archive" className="hover:line-through">Archive</Link>
            <Link href="/coffee_admin" className="hover:line-through">The Librarian's Desk</Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}