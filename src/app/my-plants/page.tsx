'use client';

import { useState, useEffect } from 'react';
import { Plant } from '@/types/plant';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfirmActionModal } from '@/components/ConfirmActionModal';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function MyPlantsPage() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [collectedPlants, setCollectedPlants] = useState<CollectedPlant[]>([]);
  const [waterModalPlant, setWaterModalPlant] = useState<CollectedPlant | null>(null);
  const [removeModalPlant, setRemoveModalPlant] = useState<CollectedPlant | null>(null);
  const [editWateringDate, setEditWateringDate] = useState<{ plant: CollectedPlant; date: Date } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setCollectedPlants(plants.map((plant: any) => ({
        ...plant,
        dateAdded: new Date(plant.createdAt),
        lastWatered: new Date(plant.lastWatered),
      })));
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

  if (status === 'loading' || isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">My Plants</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading your plants...</p>
        </div>
      </main>
    );
  }

  if (collectedPlants.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">My Plants</h2>
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't added any plants to your collection yet.</p>
          <Button
            onClick={() => router.push('/browse')}
            className="mt-4 bg-green-600 hover:bg-green-700"
          >
            Browse Plants
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectedPlants.map(plant => {
          const wateringStatus = getWateringStatus(plant.lastWatered, plant.wateringFrequency);
          
          return (
            <Card key={plant.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  fill
                  className="object-cover"
                />
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
                      onClick={() => setEditWateringDate({ plant, date: plant.lastWatered })}
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
                  variant="outline"
                  size="sm"
                  className={`w-full text-white hover:text-white ${wateringStatus.needsWater 
                    ? 'bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-400' 
                    : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400'} border-0`}
                  onClick={() => setWaterModalPlant(plant)}
                >
                  Water Plant
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => setRemoveModalPlant(plant)}
                >
                  Remove
                </Button>
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
        isOpen={!!editWateringDate}
        onClose={() => setEditWateringDate(null)}
        onConfirm={() => editWateringDate && handleUpdateWateringDate(editWateringDate.plant, editWateringDate.date)}
        title="Update Last Watering Date"
        description={
          <div className="flex flex-col items-center gap-4">
            <p>Select the last watering date for {editWateringDate?.plant.nickname || editWateringDate?.plant.name}</p>
            <DatePicker
              selected={editWateringDate?.date}
              onChange={(date) => date && setEditWateringDate(prev => prev ? { ...prev, date } : null)}
              maxDate={new Date()}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
          </div>
        }
        confirmText="Update Date"
        cancelText="Cancel"
      />
    </main>
  );
} 