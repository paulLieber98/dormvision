'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import LoadingBar from './LoadingBar';

export default function RequireVerification({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!user.emailVerified) {
        router.push('/verify-email');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingBar />;
  }

  if (!user || !user.emailVerified) {
    return null;
  }

  return <>{children}</>;
}
