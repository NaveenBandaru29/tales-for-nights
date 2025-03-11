// app/page.tsx
import { Suspense } from 'react';
import TalesList from './components/tales/TalesList';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tales Collection</h1>
      <Suspense fallback={<div className="text-center">Loading tales...</div>}>
        <TalesList />
      </Suspense>
    </main>
  );
}

