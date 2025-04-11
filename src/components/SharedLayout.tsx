'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';

export function SharedLayout({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      {children}
    </>
  );
} 