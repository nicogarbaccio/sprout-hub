import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useUserPlants } from '@/hooks/useUserPlants';
import ImageUpload from '@/components/ui/image-upload';

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
  const [lastWateredDate, setLastWateredDate] = useState<Date | undefined>(new Date());
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
      
      // Reset last watered date to today
      setLastWateredDate(new Date());
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
      suggested_watering_days: formData.watering_schedule_days,
      last_watered_date: lastWateredDate?.toISOString()
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
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
            <Label className="text-plant-text">Last Watered</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-plant-secondary/30 focus:border-plant-primary"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastWateredDate ? format(lastWateredDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastWateredDate}
                  onSelect={setLastWateredDate}
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setLastWateredDate(undefined)}
                  >
                    Clear Date
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {!lastWateredDate && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  No last watering date set - watering schedule calculations may be inaccurate
                </p>
              </div>
            )}
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

          <ImageUpload
            value={formData.image}
            onChange={(url) => handleInputChange('image', url)}
            label="Plant Image"
            placeholder="Enter image URL or upload a photo"
          />

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
