'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/PlantCard';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInModal } from '@/components/SignInModal';
import { Card, CardFooter } from "@/components/ui/card";

interface CollectedPlant extends Plant {
  nickname?: string;
  dateAdded: Date;
  lastWatered: Date;
}

export default function BrowsePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/browse');
        if (!response.ok) throw new Error('Failed to fetch plants');
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
        toast.error('Failed to load plants. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleAddToCollection = async (plantId: string, nickname: string, wateringFrequency: number) => {
    if (!session) {
      setShowSignInModal(true);
      return;
    }

    // Get the plant data
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    try {
      const response = await fetch('/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: plant.name,
          species: plant.species,
          nickname,
          image: plant.image,
          wateringFrequency,
        }),
      });

      if (!response.ok) throw new Error('Failed to add plant to collection');

      // Update the plant's status in the catalog
      setPlants(plants.map(p =>
        p.id === plantId
          ? { ...p, addedToCollection: true }
          : p
      ));

      // Show success toast
      toast.success(`${nickname || plant.name} added to your collection!`);

      // Navigate to My Plants page
      router.push('/my-plants');
    } catch (error) {
      console.error('Error adding plant to collection:', error);
      toast.error('Failed to add plant to collection. Please try again.');
    }
  };

  const filteredPlants = useMemo(() => {
    if (!searchQuery.trim()) return plants;
    
    const query = searchQuery.toLowerCase().trim();
    return plants.filter(plant => {
      const plantName = plant.name.toLowerCase();
      return plantName.startsWith(query);
    });
  }, [plants, searchQuery]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Browse Plants</h2>
          <div className="mb-8">
            <Input
              type="search"
              placeholder="Search plants by name, species, care level, or light requirement..."
              className="w-full text-gray-400"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Browse Plants</h2>
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search plants by name, species, care level, or light requirement..."
            className="w-full text-gray-400"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlants.map(plant => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onAddToCollection={handleAddToCollection}
            isSignedIn={!!session}
          />
        ))}
      </div>

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        callbackUrl="/browse"
      />
    </main>
  );
} 