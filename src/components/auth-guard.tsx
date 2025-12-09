'use client';

import { useAuth } from '@/contexts/auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from './ui/spinner';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}


