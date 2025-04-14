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
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300">Add {plant.name} to My Plants</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-foreground dark:text-gray-400">Nickname (optional)</Label>
            <Input
              id="nickname"
              placeholder="e.g., Living Room Snake Plant"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="watering" className="text-foreground dark:text-gray-400">Water every X days</Label>
            <Input
              id="watering"
              type="number"
              min="1"
              max="60"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(Number(e.target.value))}
              required
              className="bg-white dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-800"
            />
          </div>
          <DialogFooter className="gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="default"
            >
              Add to Collection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 