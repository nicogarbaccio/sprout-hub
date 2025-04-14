'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useRedirectIfAuthenticated() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Only redirect if we have a session and we're not already redirecting
    if (session && !isRedirecting && status === 'authenticated') {
      setIsRedirecting(true);
      router.push('/my-plants');
    }
  }, [session, router, isRedirecting, status]);

  return session;
} 