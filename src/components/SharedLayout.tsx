'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthStateListener } from '@/components/AuthStateListener';

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