
// app/tales/[id]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const TaleDetail = dynamic(() => import('@/app/components/tales/TaleDetail'));

interface Props {
  params: { id: string };
}

// Helper function to fetch tale data from API
async function getTaleData(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tales-for-nights.vercel.app';
    const response = await fetch(`${baseUrl}/api/tales/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      // Cache for 1 hour
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return null;
    }

    const apiResponse = await response.json();

    // Handle API response format: { success: true, data: [nextTale, tale, prevTale] }
    if (!apiResponse.success || !apiResponse.data) {
      console.warn('API response format unexpected:', apiResponse);
      return null;
    }

    const data = apiResponse.data;
    // data is an array: [nextTale, tale, prevTale]
    // The actual tale is at index 1
    const tale = Array.isArray(data) && data.length > 1 ? data[1] : null;
    return tale;
  } catch (error) {
    console.warn('Error fetching tale for metadata:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const tale = await getTaleData(id);

  // If tale not found, return minimal metadata
  if (!tale) {
    return {
      title: 'Tale Not Found | Tales For Nights',
      description: 'The tale you are looking for could not be found.',
      robots: {
        index: false,
      },
    };
  }

  // Create metadata from tale data
  const description = tale.description || tale.content.substring(0, 160);
  const title = `${tale.title} | ${description}`;
  const keywords = tale.tags?.join(', ') || '';
  const publishedTime = new Date(tale.createdAt).toISOString();
  const modifiedTime = new Date(tale.updatedAt || tale.createdAt).toISOString();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tales-for-nights.vercel.app';
  const canonicalUrl = `${siteUrl}/tales/${id}`;

  
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Tales For Nights' }],
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalUrl,
      publishedTime,
      modifiedTime,
      authors: ['Tales For Nights'],
      tags: tale.tags || [],
      images: [
        {
          url: '/TFN_LOGO.png',
          width: 1200,
          height: 630,
          alt: tale.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/TFN_LOGO.png'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function TaleDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="px-2 sm:px-4 py-4">
      {/* <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to all tales
        </Link>
      </div> */}

      <TaleDetail id={id} />
    </div>
  );
}