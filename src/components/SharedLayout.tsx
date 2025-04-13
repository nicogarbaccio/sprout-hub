'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthStateListener } from '@/components/AuthStateListener';
import { Navbar } from '@/components/Navbar';

export function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <AuthStateListener />
      <Toaster position="bottom-right" />
    </>
  );
} 