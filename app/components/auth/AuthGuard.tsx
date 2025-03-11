
// components/auth/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    if (requireAdmin && !user?.isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, user, requireAdmin, router]);
  if (!isAuthenticated || (requireAdmin && !user?.isAdmin)) {
    return null;
  }

  return <>{children}</>;
}