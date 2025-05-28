
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
        <Label htmlFor="wateringSchedule">Watering Schedule (days)</Label>
        <Input
          id="wateringSchedule"
          type="number"
          min="1"
          max="365"
          value={suggestedWateringDays}
          onChange={(e) => setSuggestedWateringDays(parseInt(e.target.value) || 7)}
          placeholder="Enter days between watering"
        />
        <p className="text-xs text-muted-foreground">
          How often should this plant be watered (in days)
        </p>
      </div>
    </div>
  );
};

export default PlantDetailsForm;
