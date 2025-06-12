import { Button } from "@/components/ui/button";
import { Droplets, AlertTriangle, Edit } from "lucide-react";
import PlantImage from "@/components/ui/plant-image";

interface MyPlantCardProps {
  id: string;
  name: string;
  plantType: string;
  image: string;
  lastWatered: string;
  lastWateredDate?: string; // Raw ISO date string for calculations
  nextWateringDue: string;
  isOverdue: boolean;
  daysUntilWatering: number;
  hasUnknownWateringDate: boolean;
  onWater: () => void;
  onEdit: () => void;
}

const MyPlantCard = ({
  name,
  plantType,
  image,
  lastWatered,
  lastWateredDate,
  nextWateringDue,
  isOverdue,
  daysUntilWatering,
  hasUnknownWateringDate,
  onWater,
  onEdit,
}: MyPlantCardProps) => {
  const getStatusColor = () => {
    if (hasUnknownWateringDate) return "bg-gray-100 text-gray-700";
    if (isOverdue) return "bg-plant-warning text-white";

    if (daysUntilWatering === 0) {
      // Check if truly just watered vs due today
      if (lastWateredDate) {
        const today = new Date();
        const lastWateredDateObj = new Date(lastWateredDate);
        const timeDiff = today.getTime() - lastWateredDateObj.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // If watered within the last 12 hours, show green (just watered)
        if (hoursDiff <= 12) {
          return "bg-green-100 text-green-700";
        }
      }

      // Otherwise it's due today, show yellow
      return "bg-yellow-100 text-yellow-700";
    }

    if (daysUntilWatering <= 1) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const getStatusText = () => {
    if (hasUnknownWateringDate) return "Unknown schedule";
    if (isOverdue) return `Overdue by ${Math.abs(daysUntilWatering)} days`;

    // Check if plant was watered within the last day (truly just watered)
    if (daysUntilWatering === 0) {
      // Additional check: if last watered was very recent (same day), show "Just watered"
      // Otherwise, it means it's exactly on schedule and due today
      if (lastWateredDate) {
        const today = new Date();
        const lastWateredDateObj = new Date(lastWateredDate);
        const timeDiff = today.getTime() - lastWateredDateObj.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // If watered within the last 12 hours, consider it "just watered"
        if (hoursDiff <= 12) {
          return "Just watered";
        }
      }

      return "Due today";
    }

    if (daysUntilWatering === 1) return "Water tomorrow";
    if (daysUntilWatering < 0)
      return `Overdue by ${Math.abs(daysUntilWatering)} days`;
    return `Water in ${daysUntilWatering} days`;
  };

  return (
    <div className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border">
      <div className="relative">
        <PlantImage src={image} alt={name} className="w-full h-40" />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {(isOverdue || hasUnknownWateringDate) && (
              <AlertTriangle className="w-3 h-3 inline mr-1" />
            )}
            {getStatusText()}
          </span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-3 right-3 bg-card/90 hover:bg-card border border-border shadow-sm"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-1 font-poppins">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{plantType}</p>

        {hasUnknownWateringDate && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-xs text-yellow-700">
              Last watering date unknown - please water and record or edit the
              plant details
            </p>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last watered:</span>
            <span className="text-foreground font-medium">{lastWatered}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next watering:</span>
            <span className="text-foreground font-medium">
              {nextWateringDue}
            </span>
          </div>
        </div>

        <Button
          onClick={onWater}
          className="w-full bg-plant-water text-white rounded-xl font-medium hover:bg-plant-water/90 hover:text-white"
        >
          <Droplets className="w-4 h-4 mr-2" />
          Water Now
        </Button>
      </div>
    </div>
  );
};

export default MyPlantCard;
