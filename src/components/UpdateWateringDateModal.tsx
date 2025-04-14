'use client';

import { Plant } from '@/types/plant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClientDatePicker } from '@/components/ClientDatePicker';

interface CollectedPlant extends Plant {
  nickname?: string;
  dateAdded: Date;
  lastWatered: Date;
}

interface UpdateWateringDateModalProps {
  plant: CollectedPlant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (plant: CollectedPlant, date: Date) => void;
}

export function UpdateWateringDateModal({
  plant,
  isOpen,
  onClose,
  onConfirm,
}: UpdateWateringDateModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(plant, plant.lastWatered);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Update Last Watering Date</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-gray-600">Select the last watering date for {plant.nickname || plant.name}</p>
            <div className="w-full">
              <ClientDatePicker
                selected={plant.lastWatered}
                onChange={(date) => {
                  if (date) {
                    plant.lastWatered = date;
                  }
                }}
                maxDate={new Date()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Update Date
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 