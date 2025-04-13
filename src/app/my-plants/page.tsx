'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plant } from '@/types/plant';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfirmActionModal } from '@/components/ConfirmActionModal';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EditPlantModal } from '@/components/EditPlantModal';
import { Droplet, Pencil, Trash } from 'lucide-react';
import { ClientDatePicker } from '@/components/ClientDatePicker';

interface CollectedPlant extends Plant {
  nickname?: string;
  dateAdded: Date;
  lastWatered: Date;
}

function isToday(date: Date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getWateringStatus(lastWatered: Date, frequency: number) {
  const today = new Date();
  const nextWateringDate = addDays(lastWatered, frequency);
  const daysUntilWatering = Math.ceil((nextWateringDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    nextDate: nextWateringDate,
    daysUntil: daysUntilWatering,
    needsWater: daysUntilWatering <= 0,
    isWarning: daysUntilWatering > 0 && daysUntilWatering <= 3,
    justWatered: isToday(lastWatered)
  };
}

function formatDate(date: Date): string {
  if (typeof window === 'undefined') {
    return ''; // Return empty string during SSR
  }
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function MyPlantsPage() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [collectedPlants, setCollectedPlants] = useState<CollectedPlant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [waterModalPlant, setWaterModalPlant] = useState<CollectedPlant | null>(null);
  const [removeModalPlant, setRemoveModalPlant] = useState<CollectedPlant | null>(null);
  const [editWateringDate, setEditWateringDate] = useState<{ plant: CollectedPlant; date: Date } | null>(null);
  const [editModalPlant, setEditModalPlant] = useState<CollectedPlant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPlants();
    }
  }, [status]);

  const fetchPlants = async () => {
    try {
      const response = await fetch('/api/plants');
      if (!response.ok) throw new Error('Failed to fetch plants');
      const plants = await response.json();
      
      // Ensure consistent date handling
      const parsedPlants = plants.map((plant: any) => {
        const dateAdded = new Date(plant.createdAt);
        const lastWatered = new Date(plant.lastWatered);
        
        // Ensure valid dates
        if (isNaN(dateAdded.getTime())) {
          throw new Error('Invalid dateAdded');
        }
        if (isNaN(lastWatered.getTime())) {
          throw new Error('Invalid lastWatered');
        }
        
        return {
          ...plant,
          dateAdded,
          lastWatered,
        };
      });
      
      setCollectedPlants(parsedPlants);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaterPlant = async (plant: CollectedPlant) => {
    try {
      const response = await fetch(`/api/plants/${plant.id}/water`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastWatered: new Date() }),
      });

      if (!response.ok) throw new Error('Failed to update plant');
      await fetchPlants();
    } catch (error) {
      console.error('Error updating plant:', error);
    }
    setWaterModalPlant(null);
  };

  const handleUpdateWateringDate = async (plant: CollectedPlant, newDate: Date) => {
    try {
      const response = await fetch(`/api/plants/${plant.id}/water`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastWatered: newDate }),
      });

      if (!response.ok) throw new Error('Failed to update plant');
      await fetchPlants();
    } catch (error) {
      console.error('Error updating plant:', error);
    }
    setEditWateringDate(null);
  };

  const handleRemovePlant = async (plant: CollectedPlant) => {
    try {
      const response = await fetch(`/api/plants/${plant.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete plant');
      await fetchPlants();
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
    setRemoveModalPlant(null);
  };

  const handleEditPlant = async (plantId: string, nickname: string, wateringFrequency: number) => {
    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, wateringFrequency }),
      });

      if (!response.ok) throw new Error('Failed to update plant');
      await fetchPlants();
    } catch (error) {
      console.error('Error updating plant:', error);
    }
  };

  const filteredPlants = useMemo(() => {
    if (!searchQuery.trim()) return collectedPlants;
    
    const query = searchQuery.toLowerCase();
    return collectedPlants.filter(plant => 
      plant.name.toLowerCase().includes(query) ||
      plant.species.toLowerCase().includes(query) ||
      (plant.nickname?.toLowerCase().includes(query) || false)
    );
  }, [collectedPlants, searchQuery]);

  if (!mounted || status === 'loading' || isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">My Plants</h2>
          <div className="mb-8">
            <Input
              type="search"
              placeholder="Search your plants by name, species, or nickname..."
              className="w-full"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-b-lg p-4 space-y-4">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (collectedPlants.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">My Plants</h2>
          <div className="text-center py-12">
            <p className="text-gray-500">You haven't added any plants to your collection yet.</p>
            <Button
              onClick={() => router.push('/browse')}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Browse Plants
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">My Plants</h2>
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search your plants by name, species, or nickname..."
            className="w-full"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map(plant => {
          const wateringStatus = getWateringStatus(plant.lastWatered, plant.wateringFrequency);
          
          return (
            <Card key={plant.id} className="overflow-hidden">
              <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                {plant.image ? (
                  <Image
                    src={plant.image}
                    alt={plant.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
                {wateringStatus.needsWater && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Needs Water!
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <h3 className="text-xl font-semibold">
                  {plant.nickname || plant.name}
                </h3>
                <p className="text-sm text-gray-600">{plant.species}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Water every:</span>
                  <span className="text-sm">{plant.wateringFrequency} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Last watered:</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm ${wateringStatus.justWatered ? 'text-green-500 font-medium' : ''}`}>
                      {formatDate(plant.lastWatered)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                      onClick={() => {
                        const lastWateredDate = plant.lastWatered instanceof Date 
                          ? plant.lastWatered 
                          : new Date(plant.lastWatered);
                        setEditWateringDate({ plant, date: lastWateredDate });
                      }}
                    >
                      <CalendarIcon className="h-3 w-3 text-gray-500" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Next watering:</span>
                  <span className={`text-sm font-medium ${
                    wateringStatus.needsWater 
                      ? 'text-red-500' 
                      : wateringStatus.isWarning
                        ? 'text-yellow-500'
                        : wateringStatus.justWatered
                          ? 'text-green-500'
                          : ''
                  }`}>
                    {wateringStatus.needsWater 
                      ? 'Overdue!'
                      : formatDate(wateringStatus.nextDate)}
                  </span>
                </div>
                {wateringStatus.needsWater && (
                  <p className="text-sm text-red-500 mt-2">
                    This plant is {Math.abs(wateringStatus.daysUntil)} day{Math.abs(wateringStatus.daysUntil) !== 1 ? 's' : ''} overdue for watering!
                  </p>
                )}
                {wateringStatus.isWarning && (
                  <p className="text-sm text-yellow-500 mt-2">
                    This plant will need water in {wateringStatus.daysUntil} day{wateringStatus.daysUntil !== 1 ? 's' : ''}!
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-4 border-t border-gray-100 flex flex-col gap-2">
                <Button
                  onClick={() => setWaterModalPlant(plant)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center gap-2"
                >
                  <Droplet className="h-4 w-4" />
                  Water
                </Button>
                <div className="flex justify-center gap-2 w-full">
                  <Button
                    onClick={() => setEditModalPlant(plant)}
                    variant="outline"
                    className="bg-amber-500 hover:bg-amber-600 text-white border-0 flex-1 flex items-center justify-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => setRemoveModalPlant(plant)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white flex-1 flex items-center justify-center gap-2"
                  >
                    <Trash className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <ConfirmActionModal
        isOpen={!!waterModalPlant}
        onClose={() => setWaterModalPlant(null)}
        onConfirm={() => waterModalPlant && handleWaterPlant(waterModalPlant)}
        title="Water Plant"
        description={`Have you watered your ${waterModalPlant?.nickname || waterModalPlant?.name}?`}
        confirmText="Yes, I've Watered It"
        cancelText="Cancel"
      />

      <ConfirmActionModal
        isOpen={!!removeModalPlant}
        onClose={() => setRemoveModalPlant(null)}
        onConfirm={() => removeModalPlant && handleRemovePlant(removeModalPlant)}
        title="Remove Plant"
        description={`Are you sure you want to remove ${removeModalPlant?.nickname || removeModalPlant?.name} from your collection?`}
        confirmText="Yes, Remove It"
        cancelText="Cancel"
        variant="destructive"
      />

      <ConfirmActionModal
        isOpen={!!editWateringDate && mounted}
        onClose={() => setEditWateringDate(null)}
        onConfirm={() => editWateringDate && handleUpdateWateringDate(editWateringDate.plant, editWateringDate.date)}
        title="Update Last Watering Date"
        description={
          mounted && editWateringDate ? (
            <div className="flex flex-col items-center gap-4">
              <span>Select the last watering date for {editWateringDate.plant.nickname || editWateringDate.plant.name}</span>
              <ClientDatePicker
                selected={editWateringDate.date}
                onChange={(date) => date && setEditWateringDate(prev => prev ? { ...prev, date } : null)}
                maxDate={new Date()}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <span>Loading...</span>
            </div>
          )
        }
        confirmText="Update Date"
        cancelText="Cancel"
      />

      <EditPlantModal
        plantId={editModalPlant?.id || ''}
        currentNickname={editModalPlant?.nickname || null}
        currentWateringFrequency={editModalPlant?.wateringFrequency || 7}
        currentImage={editModalPlant?.image || ''}
        isOpen={!!editModalPlant}
        onClose={() => setEditModalPlant(null)}
        onConfirm={handleEditPlant}
      />
    </main>
  );
} 