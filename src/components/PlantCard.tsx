import { Button } from "@/components/ui/button";
import { Droplets, Sun, Clock, Plus, Eye } from "lucide-react";

interface PlantCardProps {
  name: string;
  botanicalName: string;
  image: string;
  wateringFrequency: string;
  suggestedWateringDays?: number;
  lightRequirement: string;
  careLevel: "Easy" | "Medium" | "Hard";
  onAddToCollection?: () => void;
  onViewDetails?: () => void;
}

const PlantCard = ({
  name,
  botanicalName,
  image,
  wateringFrequency,
  suggestedWateringDays,
  lightRequirement,
  careLevel,
  onAddToCollection,
  onViewDetails,
}: PlantCardProps) => {
  const getCareColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      data-testid="plant-card"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCareColor(
              careLevel
            )}`}
          >
            {careLevel}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-plant-text mb-1 font-poppins">
          {name}
        </h3>
        <p className="text-sm text-plant-text/60 italic mb-4">
          {botanicalName}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-plant-primary" />
            <div>
              <span className="text-sm text-plant-text">
                {wateringFrequency}
              </span>
              {suggestedWateringDays && (
                <span className="text-xs text-plant-text/50 ml-1">
                  (Every {suggestedWateringDays} days)
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-plant-primary" />
            <span className="text-sm text-plant-text">{lightRequirement}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="w-full border-plant-secondary text-plant-secondary hover:bg-plant-secondary hover:text-white rounded-xl font-medium"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>

          <Button
            onClick={onAddToCollection}
            className="w-full bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Collection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
