import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlantDetailsFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  plantType: string;
  setPlantType: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  suggestedWateringDays: number;
  setSuggestedWateringDays: (value: number) => void;
}

const PlantDetailsForm = ({
  nickname,
  setNickname,
  plantType,
  setPlantType,
  image,
  setImage,
  suggestedWateringDays,
  setSuggestedWateringDays,
}: PlantDetailsFormProps) => {
  const wateringOptions = [
    { value: 3, label: 'Every 3 days' },
    { value: 7, label: 'Weekly (7 days)' },
    { value: 10, label: 'Every 10 days' },
    { value: 14, label: 'Bi-weekly (14 days)' },
    { value: 21, label: 'Every 3 weeks' },
    { value: 30, label: 'Monthly (30 days)' }
  ];

  const isCustomValue = !wateringOptions.some(option => option.value === suggestedWateringDays);

  const handleWateringScheduleChange = (value: string) => {
    if (value === 'custom') {
      // Keep current value if it's already custom, otherwise default to 7
      if (!isCustomValue) {
        setSuggestedWateringDays(7);
      }
    } else {
      setSuggestedWateringDays(parseInt(value));
    }
  };

  const getCurrentSelectValue = () => {
    if (isCustomValue) return 'custom';
    return suggestedWateringDays.toString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Plant Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter plant nickname"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="plantType">Plant Type</Label>
        <Input
          id="plantType"
          value={plantType}
          onChange={(e) => setPlantType(e.target.value)}
          placeholder="Enter plant type"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wateringSchedule">Watering Schedule</Label>
        <Select 
          value={getCurrentSelectValue()} 
          onValueChange={handleWateringScheduleChange}
        >
          <SelectTrigger>
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
        
        {isCustomValue && (
          <div className="space-y-1">
            <Label htmlFor="customDays" className="text-sm">Custom days</Label>
            <Input
              id="customDays"
              type="number"
              min="1"
              max="365"
              value={suggestedWateringDays}
              onChange={(e) => setSuggestedWateringDays(parseInt(e.target.value) || 1)}
              placeholder="Enter days between watering"
            />
            <p className="text-xs text-muted-foreground">
              Enter a number between 1 and 365 days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDetailsForm;
