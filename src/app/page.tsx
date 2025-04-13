'use client';

import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const session = useRedirectIfAuthenticated();

  if (session) {
    return null; // Return nothing while redirecting
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
