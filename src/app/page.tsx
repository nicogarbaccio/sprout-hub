'use client';

import { useState, useMemo } from 'react';
import { Plant } from '@/types/plant';
import { PlantCard } from '@/components/PlantCard';
import { plants as initialPlants } from '@/data/plants';
import { useRouter } from 'next/navigation';

interface CollectedPlant extends Plant {
  nickname?: string;
  dateAdded: Date;
  lastWatered: Date;
}

export default function Home() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleAddToCollection = (plantId: string, nickname: string, wateringFrequency: number) => {
    // Update the plant's status in the catalog
    setPlants(plants.map(plant =>
      plant.id === plantId
        ? { ...plant, addedToCollection: true, wateringFrequency }
        : plant
    ));

    // Get the plant data
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;

    // Create the collected plant entry
    const collectedPlant: CollectedPlant = {
      ...plant,
      nickname,
      wateringFrequency,
      dateAdded: new Date(),
      lastWatered: new Date(),
    };

    // Save to local storage (we'll replace this with a proper backend later)
    const existingPlants = JSON.parse(localStorage.getItem('collectedPlants') || '[]');
    localStorage.setItem('collectedPlants', JSON.stringify([...existingPlants, collectedPlant]));

    // Optionally navigate to My Plants page
    router.push('/my-plants');
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
    <main className="container mx-auto px-4">
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
