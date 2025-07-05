// app/page.tsx
import dynamic from 'next/dynamic';
const AudioPlayer = dynamic(() => import('./components/common/AudioPlayer/AudioPlayer'));
const NavTags = dynamic(() => import('./components/common/Navtags/NavTags'))
const TalesList = dynamic(() => import('./components/tales/TalesList'));

export default function HomePage() {
  return (
    <main className="container max-w-7xl mx-auto px-2 py-4">
      <NavTags />
      <div className='flex gap-4 justify-between items-center mb-8'>
        <h1 className="text-2xl sm:text-3xl font-bold ">Tales Collection</h1>
        <AudioPlayer />
      </div>
      <TalesList />
    </main>
  );
}

