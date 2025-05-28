
import { Button } from '@/components/ui/button';
import { Droplets, AlertTriangle, Edit } from 'lucide-react';

interface MyPlantCardProps {
  id: string;
  name: string;
  plantType: string;
  image: string;
  lastWatered: string;
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
  nextWateringDue, 
  isOverdue, 
  daysUntilWatering,
  hasUnknownWateringDate,
  onWater,
  onEdit 
}: MyPlantCardProps) => {
  const getStatusColor = () => {
    if (hasUnknownWateringDate) return 'bg-gray-100 text-gray-700';
    if (isOverdue) return 'bg-plant-warning text-white';
    if (daysUntilWatering <= 1) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getStatusText = () => {
    if (hasUnknownWateringDate) return 'Unknown schedule';
    if (isOverdue) return `Overdue by ${Math.abs(daysUntilWatering)} days`;
    if (daysUntilWatering === 0) return 'Water today';
    if (daysUntilWatering === 1) return 'Water tomorrow';
    if (daysUntilWatering < 0) return `Overdue by ${Math.abs(daysUntilWatering)} days`;
    return `Water in ${daysUntilWatering} days`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {(isOverdue || hasUnknownWateringDate) && <AlertTriangle className="w-3 h-3 inline mr-1" />}
            {getStatusText()}
          </span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-plant-text mb-1 font-poppins">{name}</h3>
        <p className="text-sm text-plant-text/60 mb-4">{plantType}</p>
        
        {hasUnknownWateringDate && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <p className="text-xs text-yellow-700">
              Last watering date unknown - please water and record or edit the plant details
            </p>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-plant-text/60">Last watered:</span>
            <span className="text-plant-text font-medium">{lastWatered}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-plant-text/60">Next watering:</span>
            <span className="text-plant-text font-medium">{nextWateringDue}</span>
          </div>
        </div>
        
        <Button 
          onClick={onWater}
          className="w-full bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl font-medium"
        >
          <Droplets className="w-4 h-4 mr-2" />
          Water Now
        </Button>
      </div>
    </div>
  );
};

export default MyPlantCard;
