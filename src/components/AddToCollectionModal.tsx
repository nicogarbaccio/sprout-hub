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
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Add {plant.name} to My Plants</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-gray-900">Nickname (optional)</Label>
            <Input
              id="nickname"
              placeholder="e.g., Living Room Snake Plant"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-white text-gray-900 border-gray-200 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="watering" className="text-gray-900">Water every X days</Label>
            <Input
              id="watering"
              type="number"
              min="1"
              max="60"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(Number(e.target.value))}
              required
              className="bg-white text-gray-900 border-gray-200"
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