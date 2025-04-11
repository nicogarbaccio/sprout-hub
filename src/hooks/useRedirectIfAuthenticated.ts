'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useRedirectIfAuthenticated() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && typeof window !== 'undefined') {
      const storedPlants = localStorage.getItem('collectedPlants');
      if (storedPlants && JSON.parse(storedPlants).length > 0) {
        router.push('/my-plants');
      } else {
        router.push('/browse');
      }
    }
  }, [session, router]);

  return session;
} 