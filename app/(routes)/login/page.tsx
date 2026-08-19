// app/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/app/store';
import dynamic from 'next/dynamic';
import LazyLoader from '@/app/components/ui/Loader';
import { motion } from 'framer-motion';
import { ArrowBackRounded } from '@mui/icons-material';

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
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Premium subtle background decorative elements using Framer Motion */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-8 left-1/2 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-70 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-1">
            Admin Portal
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            Sign in to manage your tales
          </p>
        </div>

        <LoginForm />

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/40 dark:bg-slate-800/40 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-md group"
          >
            <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5 opacity-80 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              <ArrowBackRounded sx={{ height: '18px', width: '18px' }} />
            </span>
            <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Return to homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
