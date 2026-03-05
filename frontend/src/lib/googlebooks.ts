export async function searchGoogleBooks(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`
  );
  const data = await response.json();
  
  return data.items?.map((item: any) => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || "Unknown Author",
    coverUrl: item.volumeInfo.imageLinks?.thumbnail || "",
    description: item.volumeInfo.description || "",
  })) || [];
}