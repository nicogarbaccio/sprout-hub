import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserPlants } from '@/hooks/useUserPlants';

interface PlantData {
  name: string;
  botanicalName: string;
  image: string;
  wateringFrequency: string;
  suggestedWateringDays?: number;
  lightRequirement: string;
  careLevel: string;
}

interface AddPlantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plantData?: PlantData | null;
}

const AddPlantDialog = ({ isOpen, onClose, plantData }: AddPlantDialogProps) => {
  const { addPlant } = useUserPlants();
  const [formData, setFormData] = useState({
    nickname: '',
    plant_type: '',
    image: '',
    watering_schedule_days: 7,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customDays, setCustomDays] = useState<string>('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  // Reset form when dialog opens/closes or plant data changes
  useEffect(() => {
    if (isOpen) {
      if (plantData) {
        // Pre-populate with catalog plant data
        setFormData({
          nickname: plantData.name,
          plant_type: plantData.name,
          image: plantData.image,
          watering_schedule_days: plantData.suggestedWateringDays || 7,
          notes: `Botanical name: ${plantData.botanicalName}\nWatering: ${plantData.wateringFrequency}\nLight: ${plantData.lightRequirement}\nCare level: ${plantData.careLevel}`
        });
        
        // Check if the suggested days match any preset option
        const suggestedDays = plantData.suggestedWateringDays || 7;
        const presetOptions = [3, 7, 10, 14, 21, 30];
        if (!presetOptions.includes(suggestedDays)) {
          setIsCustomSelected(true);
          setCustomDays(suggestedDays.toString());
        } else {
          setIsCustomSelected(false);
          setCustomDays('');
        }
      } else {
        // Reset for manual addition
        setFormData({
          nickname: '',
          plant_type: '',
          image: '',
          watering_schedule_days: 7,
          notes: ''
        });
        setIsCustomSelected(false);
        setCustomDays('');
      }
    }
  }, [isOpen, plantData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nickname.trim() || !formData.plant_type.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    const success = await addPlant({
      nickname: formData.nickname.trim(),
      plant_type: formData.plant_type.trim(),
      image: formData.image.trim() || undefined,
      suggested_watering_days: formData.watering_schedule_days
    });

    if (success) {
      onClose();
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWateringScheduleChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomSelected(true);
      // Keep current custom value or default to 7
      const days = customDays ? parseInt(customDays) : 7;
      handleInputChange('watering_schedule_days', days);
    } else {
      setIsCustomSelected(false);
      setCustomDays('');
      handleInputChange('watering_schedule_days', parseInt(value));
    }
  };

  const handleCustomDaysChange = (value: string) => {
    setCustomDays(value);
    const days = parseInt(value) || 1;
    handleInputChange('watering_schedule_days', Math.max(1, Math.min(365, days)));
  };

  const commonPlantTypes = [
    'Peace Lily',
    'Monstera Deliciosa',
    'Snake Plant',
    'Fiddle Leaf Fig',
    'Pothos',
    'Rubber Plant',
    'ZZ Plant',
    'Boston Fern',
    'Aloe Vera',
    'Philodendron',
    'Bird of Paradise',
    'Spider Plant'
  ];

  const wateringOptions = [
    { value: 3, label: 'Every 3 days' },
    { value: 7, label: 'Weekly (7 days)' },
    { value: 10, label: 'Every 10 days' },
    { value: 14, label: 'Bi-weekly (14 days)' },
    { value: 21, label: 'Every 3 weeks' },
    { value: 30, label: 'Monthly (30 days)' }
  ];

  // Determine the current select value
  const getCurrentSelectValue = () => {
    if (isCustomSelected) return 'custom';
    return formData.watering_schedule_days.toString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-plant-text font-poppins">
            {plantData ? `Add ${plantData.name} to Collection` : 'Add New Plant'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-plant-text">Plant Nickname *</Label>
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              placeholder="Give your plant a nickname"
              className="border-plant-secondary/30 focus:border-plant-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plant_type" className="text-plant-text">Plant Type *</Label>
            <Select value={formData.plant_type} onValueChange={(value) => handleInputChange('plant_type', value)}>
              <SelectTrigger className="border-plant-secondary/30 focus:border-plant-primary">
                <SelectValue placeholder="Select or type plant type" />
              </SelectTrigger>
              <SelectContent>
                {commonPlantTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={formData.plant_type}
              onChange={(e) => handleInputChange('plant_type', e.target.value)}
              placeholder="Or type custom plant type"
              className="border-plant-secondary/30 focus:border-plant-primary mt-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="watering_schedule" className="text-plant-text">Watering Schedule</Label>
            <Select 
              value={getCurrentSelectValue()} 
              onValueChange={handleWateringScheduleChange}
            >
              <SelectTrigger className="border-plant-secondary/30 focus:border-plant-primary">
                <SelectValue placeholder="Select watering frequency" />
              </SelectTrigger>
              <SelectContent>
                {wateringOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            
            {isCustomSelected && (
              <div className="space-y-1">
                <Label htmlFor="custom_days" className="text-plant-text text-sm">Custom days</Label>
                <Input
                  id="custom_days"
                  type="number"
                  min="1"
                  max="365"
                  value={customDays}
                  onChange={(e) => handleCustomDaysChange(e.target.value)}
                  placeholder="Enter days between watering"
                  className="border-plant-secondary/30 focus:border-plant-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a number between 1 and 365 days
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-plant-text">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="https://example.com/plant-image.jpg"
              className="border-plant-secondary/30 focus:border-plant-primary"
            />
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Plant preview" 
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-plant-text">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Care instructions, botanical name, etc."
              className="border-plant-secondary/30 focus:border-plant-primary min-h-20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-plant-secondary/30 hover:bg-plant-secondary/10"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.nickname.trim() || !formData.plant_type.trim() || isSubmitting}
              className="flex-1 bg-plant-primary hover:bg-plant-primary/90 text-white"
            >
              {isSubmitting ? 'Adding...' : 'Add Plant'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlantDialog;
