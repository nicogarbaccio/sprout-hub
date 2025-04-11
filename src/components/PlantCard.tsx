import { useState } from 'react';
import Image from 'next/image';
import { Plant } from '@/types/plant';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddToCollectionModal } from '@/components/AddToCollectionModal';

interface PlantCardProps {
  plant: Plant;
  onAddToCollection: (plantId: string, nickname: string, wateringFrequency: number) => void;
}

export function PlantCard({ plant, onAddToCollection }: PlantCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border border-gray-200 rounded-lg">
        <div className="relative h-48 w-full">
          <Image
            src={plant.image}
            alt={plant.name}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="p-4">
          <h3 className="text-xl font-semibold">{plant.name}</h3>
          <p className="text-sm text-gray-600">{plant.species}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Light:</span>
            <span className="text-sm capitalize">{plant.lightRequirement}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Water:</span>
            <span className="text-sm">Every {plant.wateringFrequency} days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Care Level:</span>
            <span className="text-sm capitalize">{plant.careLevel}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{plant.description}</p>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-100 flex justify-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={plant.addedToCollection}
            className={`w-full max-w-[200px] ${plant.addedToCollection ? 'bg-gray-100 hover:bg-gray-200' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {plant.addedToCollection ? 'In Collection' : 'Add to Collection'}
          </Button>
        </CardFooter>
      </Card>

      <AddToCollectionModal
        plant={plant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onAddToCollection}
      />
    </>
  );
} 