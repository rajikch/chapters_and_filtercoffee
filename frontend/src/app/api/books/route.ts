import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. The SEARCH "Scout" (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  const res = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=5`);
  const data = await res.json();

  const results = data.docs.map((item: any) => ({
    title: item.title,
    author: item.author_name?.join(', ') || 'Unknown',
    cover_url: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : ""
  }));

  return NextResponse.json(results);
}

// 2. The ADD "Librarian" (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error } = await supabase.from('books').insert([body]);
    
    if (error) throw error;
    return NextResponse.json({ message: 'Success' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}