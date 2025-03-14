// app/layout.tsx
import './globals.css';
import { ReduxProvider } from './store/StoreProvider';
import AuthProvider from './components/auth/AuthProvider';
import type { Metadata } from 'next';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

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
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ReduxProvider>
          <AuthProvider>
            <>
            <Navbar />
            <main className="container mx-auto px-2 sm:px-4 flex-1 min-h-[86vh]">
              {children}
            </main>
            <Footer />
            </>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
