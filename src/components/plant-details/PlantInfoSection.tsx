
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlantInfoSectionProps {
  name: string;
  botanicalName: string;
  description: string;
  careLevel: string;
  toxicity: string;
  onAddToCollection: () => void;
}

const PlantInfoSection = ({ 
  name, 
  botanicalName, 
  description, 
  careLevel, 
  toxicity, 
  onAddToCollection 
}: PlantInfoSectionProps) => {
  const getCareColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-plant-text font-poppins">{name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCareColor(careLevel)}`}>
            {careLevel}
          </span>
        </div>
        <p className="text-lg text-plant-text/60 italic mb-4">{botanicalName}</p>
        <p className="text-plant-text leading-relaxed">{description}</p>
      </div>

      <Button 
        onClick={onAddToCollection}
        className="w-full bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl font-medium py-3"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add to My Collection
      </Button>
      
      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm text-red-700">
          <strong>Pet Safety:</strong> {toxicity}
        </p>
      </div>
    </div>
  );
};

export default PlantInfoSection;
