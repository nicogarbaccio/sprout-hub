'use client';

import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const redirectSession = useRedirectIfAuthenticated();

  // Show loading state while session is being determined
  if (status === 'loading') {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </main>
    );
  }

  // If we have a session, we're redirecting
  if (redirectSession) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Sprout Hub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal plant care companion. Track watering schedules, manage your collection, and discover new plants to grow.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push('/browse')}
            className="bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Browse Plants
          </Button>
        </div>
      </div>
    </main>
  );
}
