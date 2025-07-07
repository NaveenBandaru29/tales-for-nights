// app/page.tsx
import dynamic from 'next/dynamic';
const AudioPlayer = dynamic(() => import('./components/common/AudioPlayer/AudioPlayer'));
const TalesList = dynamic(() => import('./components/tales/TalesList'));

export default function HomePage() {
  return (
    <main className="">
      {/* <NavTags /> */}
      <div className='flex gap-4 justify-between items-center mb-8'>
        <div className='flex flex-col'>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Tales</h1>
          <p className='text-sm font-bold font-mono'>Stories of love, loss, and the pain that never really fades.</p>
        </div>
        <AudioPlayer source={"/theme.mp3"} />
      </div>
      <TalesList />
    </main>
  );
}

