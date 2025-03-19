// app/raw/page.tsx
'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import RawList from '@/app/components/raw/RawList';
import { RootState } from '@/app/store';
import NavTags from '@/app/components/common/Navtags/NavTags';

export default function RawPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  
  // Optional: Redirect unauthenticated users
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);
  
  return (
    <div className="container mx-auto px-4 py-4">
      <NavTags />
      <RawList />
    </div>
  );
}