import './globals.css';
import { ReduxProvider } from './store/StoreProvider';
import AuthProvider from './components/auth/AuthProvider';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Tales For Nights 💤',
  description: 'Dive into the world of tales which make you cry before bed',
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