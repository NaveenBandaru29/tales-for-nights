import { MetadataRoute } from 'next';

// Helper function to fetch tales for sitemap generation
async function getAllTales() {
  try {
    // Using internal fetch - this will use the API route
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tales-for-nights.vercel.app';
    const response = await fetch(`${baseUrl}/api/tales?limit=1000`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn('Failed to fetch tales for sitemap');
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('Error fetching tales for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tales-for-nights.vercel.app';
  const tales = await getAllTales();

  const sitemapEntries: MetadataRoute.Sitemap = [
    // Home page - highest priority, updated weekly
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Collection pages - high priority, updated weekly
    {
      url: `${baseUrl}/charm`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/raw`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Dynamic tale pages - medium priority, updated monthly
    ...tales.map((tale: any) => ({
      url: `${baseUrl}/tales/${tale._id}`,
      lastModified: new Date(tale.updatedAt || tale.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return sitemapEntries;
}
