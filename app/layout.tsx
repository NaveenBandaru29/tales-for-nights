import './globals.css';
import { ReduxProvider } from './store/StoreProvider';
import AuthProvider from './components/auth/AuthProvider';
import type { Metadata, Viewport } from 'next';
import Navbar from './components/common/Navbar';
import Footer from './components/ui/Footer';
import { Suspense } from 'react';
import { LazyLoader } from './components/ui/Loader';
import dynamic from 'next/dynamic';
import { ThemeProvider } from './context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next"
import TanstackProvider from './context/TanstackProvider';

import { Meteors } from './components/ui/Meteors';

const NavTags = dynamic(() => import('@/app/components/common/Navtags/NavTags'));

import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

// Get the canonical domain from environment or default to production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tales-for-nights.vercel.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tales For Nights 💤 - Stories of Love, Loss & Heartache',
    template: '%s | Tales For Nights',
  },
  description: 'Dive into the world of tales which make you cry before bed. Stories of love, loss, and the pain that never really fades. I walk, I weep, I write.',
  keywords: ['stories', 'tales', 'poetry', 'creative writing', 'emotional stories', 'romantic tales', 'short stories'],
  authors: [{ name: 'Tales For Nights' }],
  creator: 'Tales For Nights',
  publisher: 'Tales For Nights',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Tales For Nights',
    title: 'Tales For Nights 💤 - Stories of Love, Loss & Heartache',
    description: 'Dive into the world of tales which make you cry before bed. Stories of love, loss, and the pain that never really fades.',
    images: [
      {
        url: '/TFN_LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Tales For Nights - Stories of Love, Loss & Heartache',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@talesforhightsnight',
    title: 'Tales For Nights 💤 - Stories of Love, Loss & Heartache',
    description: 'Dive into the world of tales which make you cry before bed.',
    images: ['/TFN_LOGO.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${outfit.variable} min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 ease-in-out`}>
        {/* Global Animated Background */}
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <Meteors number={30} />
        </div>

        <Suspense fallback={<LazyLoader />}>
          <ReduxProvider>
            <TanstackProvider>
              <ThemeProvider>
                <AuthProvider>
                  <div className="flex flex-col min-h-screen relative z-10">
                    <Navbar />
                    <main className="container max-w-7xl mx-auto p-4 sm:p-8 flex-1 mt-16 relative z-10 bg-transparent">
                      <NavTags />
                      {children}
                    </main>
                    <Footer />
                  </div>
                </AuthProvider>
              </ThemeProvider>
            </TanstackProvider>
          </ReduxProvider>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}