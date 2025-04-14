import { useState, useEffect } from 'react';
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
import Image from 'next/image';
import toast from 'react-hot-toast';
import { uploadImage } from '@/lib/cloudinary';

interface EditPlantModalProps {
  plantId: string;
  currentNickname: string | null;
  currentWateringFrequency: number;
  currentImage: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (plantId: string, nickname: string, wateringFrequency: number) => void;
}

export function EditPlantModal({
  plantId,
  currentNickname,
  currentWateringFrequency,
  currentImage,
  isOpen,
  onClose,
  onConfirm,
}: EditPlantModalProps) {
  const [nickname, setNickname] = useState(currentNickname || '');
  const [hasEditedNickname, setHasEditedNickname] = useState(false);
  const [wateringFrequency, setWateringFrequency] = useState(currentWateringFrequency);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage);

  // Update previewImage when currentImage changes
  useEffect(() => {
    setPreviewImage(currentImage);
  }, [currentImage]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadImage(file);

      // Update plant image in database
      const updateResponse = await fetch(`/api/plants/${plantId}/image`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!updateResponse.ok) throw new Error('Failed to update plant image');

      setPreviewImage(imageUrl);
      toast.success('Image updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nicknameToUpdate = hasEditedNickname ? nickname : currentNickname || '';
    onConfirm(plantId, nicknameToUpdate, wateringFrequency);
    toast.success('Plant details updated successfully');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Plant Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-gray-700">Nickname (optional)</Label>
            <Input
              id="nickname"
              placeholder="e.g., Living Room Snake Plant"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setHasEditedNickname(true);
              }}
              className="bg-white text-gray-900 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="watering" className="text-gray-700">Water every (X) days</Label>
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
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-700">Plant Photo</Label>
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Plant"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2.5 file:px-6
                file:rounded-l-full file:border-0
                file:text-sm file:font-medium
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200
                file:transition-colors
                rounded-full border border-gray-200
                cursor-pointer
                focus:outline-none"
            />
            {isUploading && (
              <p className="text-sm text-gray-500">Uploading image...</p>
            )}
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