// app/raw/page.tsx
// 'use client';

// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { RootState } from '@/app/store';
import dynamic from 'next/dynamic';
const RawList = dynamic(() => import('@/app/components/raw/RawList'))

export default function RawPage() {
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  // const router = useRouter();

  // Optional: Redirect unauthenticated users
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  return (
    <div className="">
      {/* max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 */}
      {/* <NavTags /> */}
      <p className='text-sm font-bold font-mono mb-4'>Unfiltered emotions, bitter truths, and sharp outbursts.</p>
      <RawList />
    </div>
  );
}