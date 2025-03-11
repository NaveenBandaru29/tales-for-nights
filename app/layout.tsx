// app/layout.tsx
import './globals.css';
import { ReduxProvider } from './store/StoreProvider';
import AuthProvider from './components/auth/AuthProvider';
import type { Metadata } from 'next';
import Navbar from './components/ui/Navbar';

export const metadata: Metadata = {
  title: 'Tales App',
  description: 'A collection of interesting tales',
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
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            </>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
