'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AuthCheckProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function AuthCheck({ 
  children, 
  requireAdmin = true, 
  redirectTo = '/login'
}: AuthCheckProps) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requireAdmin && !user?.isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, user, requireAdmin,router]);

  // Show nothing while checking authentication
  if (!isAuthenticated || (requireAdmin && !user?.isAdmin)) {
    return null;
  }

  return <>{children}</>;
}
