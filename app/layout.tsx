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

const NavTags = dynamic(() => import('@/app/components/common/Navtags/NavTags'));

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
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 ease-in-out">
        <Suspense fallback={<LazyLoader />}>
          <ReduxProvider>
            <ThemeProvider>
              <AuthProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="container max-w-7xl mx-auto p-4 sm:p-8 flex-1">
                    <NavTags />
                    {children}
                  </main>
                  <Footer />
                </div>
              </AuthProvider>
            </ThemeProvider>
          </ReduxProvider>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}