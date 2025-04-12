import { useState } from 'react';
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

interface EditPlantModalProps {
  plantId: string;
  currentNickname: string | null;
  currentWateringFrequency: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (plantId: string, nickname: string, wateringFrequency: number) => void;
}

export function EditPlantModal({
  plantId,
  currentNickname,
  currentWateringFrequency,
  isOpen,
  onClose,
  onConfirm,
}: EditPlantModalProps) {
  const [nickname, setNickname] = useState(currentNickname || '');
  const [wateringFrequency, setWateringFrequency] = useState(currentWateringFrequency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(plantId, nickname, wateringFrequency);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-foreground dark:text-gray-300">Edit Plant Details</DialogTitle>
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
            <Label htmlFor="watering" className="text-foreground dark:text-gray-400">Water every (X) days</Label>
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
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 