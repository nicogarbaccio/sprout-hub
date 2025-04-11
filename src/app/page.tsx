'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPlants = localStorage.getItem('collectedPlants');
    if (storedPlants && JSON.parse(storedPlants).length > 0) {
      router.push('/my-plants');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null; // Return nothing during the loading state to prevent flicker
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Sprout Hub</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal plant care companion. Track watering schedules, manage your collection, and discover new plants to grow.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/browse')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Browse Plants
          </button>
        </div>
      </div>
    </main>
  );
}
