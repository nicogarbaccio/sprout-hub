'use client';

import { useState, useMemo } from 'react';
import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/PlantCard';
import { plants as initialPlants } from '@/data/plants';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';

interface CollectedPlant extends Plant {
  nickname?: string;
  dateAdded: Date;
  lastWatered: Date;
}

export default function BrowsePage() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleAddToCollection = async (plantId: string, nickname: string, wateringFrequency: number) => {
    if (!session) {
      router.push('/auth/signin');
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

      // Navigate to My Plants page
      router.push('/my-plants');
    } catch (error) {
      console.error('Error adding plant to collection:', error);
    }
  };

  const filteredPlants = useMemo(() => {
    if (!searchQuery.trim()) return plants;
    
    const query = searchQuery.toLowerCase();
    return plants.filter(plant => 
      plant.name.toLowerCase().includes(query) ||
      plant.species.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query) ||
      plant.careLevel.toLowerCase().includes(query) ||
      plant.lightRequirement.toLowerCase().includes(query)
    );
  }, [plants, searchQuery]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <Input
          type="search"
          placeholder="Search plants by name, species, care level, or light requirement..."
          className="w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlants.map(plant => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onAddToCollection={handleAddToCollection}
          />
        ))}
      </div>
    </main>
  );
} 