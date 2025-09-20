// app/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import LoginForm from '../components/auth/LoginForm';
import Link from 'next/link';
import { RootState } from '@/app/store';
import dynamic from 'next/dynamic';
import LazyLoader from '@/app/components/ui/Loader';
const LoginForm = dynamic(() => import('@/app/components/auth/LoginForm'), { ssr: false, loading: () => <LazyLoader /> });

export default function LoginPage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold dark:backdrop-blur-md dark:text-gray-50">Admin Login</h1>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
