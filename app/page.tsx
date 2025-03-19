// app/page.tsx
import { Suspense } from 'react';
import TalesList from './components/tales/TalesList';
import AudioPlayer from './components/common/AudioPlayer/AudioPlayer';
import NavTags from './components/common/Navtags/NavTags';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-4">
      <NavTags />
      <div className='flex gap-4 justify-between items-center mb-8'>
        <h1 className="text-2xl sm:text-3xl font-bold ">Tales Collection</h1>
        <AudioPlayer />
      </div>
      <Suspense fallback={<div className="text-center">Loading tales...</div>}>
        <TalesList />
      </Suspense>
    </main>
  );
}

