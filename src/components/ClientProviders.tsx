'use client';

import { SessionProvider } from './SessionProvider';
import { SharedLayout } from './SharedLayout';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SharedLayout>{children}</SharedLayout>
    </SessionProvider>
  );
} 