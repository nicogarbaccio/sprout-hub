import { useState } from 'react';
import { Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyPlantCard from './MyPlantCard';
import EditPlantDialog from './EditPlantDialog';
import AddPlantDialog from './AddPlantDialog';
import { useUserPlants } from '@/hooks/useUserPlants';
import { useAuth } from '@/contexts/AuthContext';

const MyPlantsCollection = () => {
  const { user } = useAuth();
  const { plants, loading, fetchPlants, waterPlant } = useUserPlants();
  const [editingPlant, setEditingPlant] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-plant-text">Loading your plants...</div>
          </div>
        </div>
      </section>
    );
  }

  const overdueCount = plants.filter(plant => {
    if (!plant.days_since_watering || !plant.latest_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering > wateringSchedule;
  }).length;

  const dueToday = plants.filter(plant => {
    if (!plant.days_since_watering || !plant.latest_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering >= wateringSchedule;
  }).length;

  const unknownWateringCount = plants.filter(plant => !plant.latest_watering).length;

  const handleEditPlant = (plant: any) => {
    setEditingPlant(plant);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingPlant(null);
  };

  const handleUpdatePlant = () => {
    fetchPlants();
  };

  const handleAddPlant = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNextWateringDate = (lastWatered: string | undefined, daysAgo: number | undefined, wateringSchedule: number) => {
    if (!lastWatered || daysAgo === undefined) {
      return 'Unknown';
    }
    
    const lastWateredDate = new Date(lastWatered);
    const nextWatering = new Date(lastWateredDate);
    nextWatering.setDate(nextWatering.getDate() + wateringSchedule);
    
    return formatDate(nextWatering.toISOString());
  };

  const isOverdue = (daysAgo: number | undefined, wateringSchedule: number, hasLastWatered: boolean) => {
    return hasLastWatered && daysAgo !== undefined && daysAgo > wateringSchedule;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-plant-text mb-4 font-poppins">
              My Plant Collection
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-plant-secondary/20 text-plant-primary px-3 py-1 rounded-full">
                {plants.length} plants total
              </span>
              {overdueCount > 0 && (
                <span className="bg-plant-warning/20 text-plant-warning px-3 py-1 rounded-full">
                  {overdueCount} overdue
                </span>
              )}
              {dueToday > 0 && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {dueToday} due today
                </span>
              )}
              {unknownWateringCount > 0 && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {unknownWateringCount} unknown schedule
                </span>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleAddPlant}
            className="bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Plant
          </Button>
        </div>
        
        {plants.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-plant-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-plant-primary" />
            </div>
            <h3 className="text-xl font-semibold text-plant-text mb-2 font-poppins">Start Your Plant Journey</h3>
            <p className="text-plant-text/60 mb-6">Add your first plant to begin tracking its care and growth.</p>
            <Button 
              onClick={handleAddPlant}
              className="bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl"
            >
              Add Your First Plant
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.map((plant) => {
              const wateringSchedule = plant.suggested_watering_days || 7;
              const hasLastWatered = !!plant.latest_watering;
              return (
                <MyPlantCard
                  key={plant.id}
                  id={plant.id}
                  name={plant.nickname}
                  plantType={plant.plant_type}
                  image={plant.image || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop'}
                  lastWatered={plant.latest_watering ? formatDate(plant.latest_watering) : 'Unknown'}
                  nextWateringDue={getNextWateringDate(plant.latest_watering, plant.days_since_watering, wateringSchedule)}
                  isOverdue={isOverdue(plant.days_since_watering, wateringSchedule, hasLastWatered)}
                  daysUntilWatering={plant.days_since_watering ? (wateringSchedule - plant.days_since_watering) : 0}
                  hasUnknownWateringDate={!hasLastWatered}
                  onWater={() => waterPlant(plant.id)}
                  onEdit={() => handleEditPlant(plant)}
                />
              );
            })}
          </div>
        )}

        <EditPlantDialog
          plant={editingPlant}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onUpdate={handleUpdatePlant}
        />

        <AddPlantDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
        />
      </div>
    </section>
  );
};

export default MyPlantsCollection;
