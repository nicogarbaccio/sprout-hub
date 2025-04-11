import { useState } from 'react';
import { Plant } from '@/types/plant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AddToCollectionModalProps {
  plant: Plant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (plantId: string, nickname: string, wateringFrequency: number) => void;
}

export function AddToCollectionModal({
  plant,
  isOpen,
  onClose,
  onConfirm,
}: AddToCollectionModalProps) {
  const [nickname, setNickname] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState(plant.wateringFrequency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(plant.id, nickname, wateringFrequency);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add {plant.name} to My Plants</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname (optional)</Label>
            <Input
              id="nickname"
              placeholder="e.g., Living Room Snake Plant"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="watering">Water every X days</Label>
            <Input
              id="watering"
              type="number"
              min="1"
              max="60"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(Number(e.target.value))}
              required
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Add to Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 