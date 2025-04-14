'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const AUTH_STATE_KEY = 'sprout_hub_auth_state';

export function AuthStateListener() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;

    // Get the previous auth state from localStorage
    const prevAuthState = localStorage.getItem(AUTH_STATE_KEY);

    if (status === 'authenticated' && session) {
      if (prevAuthState !== 'authenticated') {
        toast.success('Signed in successfully!');
      }
      localStorage.setItem(AUTH_STATE_KEY, 'authenticated');
    } else if (status === 'unauthenticated') {
      if (window.location.search.includes('signedOut=true') && prevAuthState === 'authenticated') {
        toast.success('Signed out successfully!');
      }
      localStorage.setItem(AUTH_STATE_KEY, 'unauthenticated');
    }
  }, [status, session]);

  return null;
} 