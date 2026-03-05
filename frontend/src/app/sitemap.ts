import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thebrewedchapter.com'; // Replace with your domain

  // Fetch your posts from WordPress to include them in the map
  const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/thebrewedchapter.wordpress.com/posts');
  const posts = await response.json();

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.modified),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}