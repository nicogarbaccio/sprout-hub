import { Button } from "@/components/ui/button";
import { Droplets, Sun, Clock, Plus, Eye, LogIn } from "lucide-react";
import PlantImage from "@/components/ui/plant-image";

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
  isAuthenticated?: boolean;
  onSignInToAdd?: () => void;
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
  isAuthenticated = false,
  onSignInToAdd,
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
      className="bg-card rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-border"
      data-testid="plant-card"
    >
      <div className="relative">
        <PlantImage
          src={image}
          alt={name}
          className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
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
        <h3 className="text-lg font-semibold text-foreground mb-1 font-poppins">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground italic mb-4">
          {botanicalName}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-plant-primary dark:text-plant-secondary" />
            <div>
              <span className="text-sm text-foreground">
                {wateringFrequency}
              </span>
              {suggestedWateringDays && (
                <span className="text-xs text-muted-foreground ml-1">
                  (Every {suggestedWateringDays} days)
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="w-4 h-4 text-plant-primary dark:text-plant-secondary" />
            <span className="text-sm text-foreground">{lightRequirement}</span>
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

          {isAuthenticated ? (
            <Button
              onClick={onAddToCollection}
              className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Collection
            </Button>
          ) : (
            <Button
              onClick={onSignInToAdd}
              className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in to Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
