import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyPlantCardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { CascadingGrid } from "@/components/ui/cascading-grid";
import { useGracefulLoading } from "@/hooks/useGracefulLoading";
import MyPlantCard from "./MyPlantCard";
import EditPlantDialog from "./EditPlantDialog";
import AddPlantDialog from "./AddPlantDialog";
import { useUserPlants, UserPlant } from "@/hooks/useUserPlants";
import { useAuth } from "@/contexts/AuthContext";

const MyPlantsCollection = () => {
  const { user } = useAuth();
  const { plants, loading, fetchPlants, waterPlant } = useUserPlants();
  const [editingPlant, setEditingPlant] = useState<UserPlant | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { showLoading, isReady } = useGracefulLoading(loading, {
    minLoadingTime: 400,
    staggerDelay: 100,
  });

  if (!user) {
    return null;
  }

  if (showLoading) {
    return (
      <section className="py-20 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <Skeleton className="h-10 w-80 mb-4" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-36 rounded-xl mt-4 md:mt-0" />
          </div>

          {/* Plant Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <MyPlantCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!isReady) {
    return (
      <section className="py-20 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0">
          {/* Invisible content to maintain height */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="h-10 w-80 mb-4" />
              <div className="flex flex-wrap gap-4">
                <div className="h-6 w-20" />
                <div className="h-6 w-24" />
                <div className="h-6 w-28" />
              </div>
            </div>
            <div className="h-10 w-36 mt-4 md:mt-0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const overdueCount = plants.filter((plant) => {
    if (!plant.days_since_watering || !plant.latest_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering > wateringSchedule;
  }).length;

  const dueToday = plants.filter((plant) => {
    if (!plant.days_since_watering || !plant.latest_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering >= wateringSchedule;
  }).length;

  const unknownWateringCount = plants.filter(
    (plant) => !plant.latest_watering
  ).length;

  const handleEditPlant = (plant: UserPlant) => {
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
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getNextWateringDate = (
    lastWatered: string | undefined,
    daysAgo: number | undefined,
    wateringSchedule: number
  ) => {
    if (!lastWatered || daysAgo === undefined) {
      return "Unknown";
    }

    const lastWateredDate = new Date(lastWatered);
    const nextWatering = new Date(lastWateredDate);
    nextWatering.setDate(nextWatering.getDate() + wateringSchedule);

    return formatDate(nextWatering.toISOString());
  };

  const isOverdue = (
    daysAgo: number | undefined,
    wateringSchedule: number,
    hasLastWatered: boolean
  ) => {
    return (
      hasLastWatered && daysAgo !== undefined && daysAgo > wateringSchedule
    );
  };

  return (
    <section className="py-20 bg-white min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CascadingContainer delay={0}>
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
        </CascadingContainer>

        {plants.length === 0 ? (
          <CascadingContainer delay={200}>
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-plant-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-plant-primary" />
              </div>
              <h3 className="text-xl font-semibold text-plant-text mb-2 font-poppins">
                Start Your Plant Journey
              </h3>
              <p className="text-plant-text/60 mb-6">
                Add your first plant to begin tracking its care and growth.
              </p>
              <Button
                onClick={handleAddPlant}
                className="bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl"
              >
                Add Your First Plant
              </Button>
            </div>
          </CascadingContainer>
        ) : (
          <CascadingGrid
            items={plants}
            renderItem={(plant) => {
              const wateringSchedule = plant.suggested_watering_days || 7;
              const hasLastWatered = !!plant.latest_watering;
              return (
                <MyPlantCard
                  key={plant.id}
                  id={plant.id}
                  name={plant.nickname}
                  plantType={plant.plant_type}
                  image={
                    plant.image ||
                    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
                  }
                  lastWatered={
                    plant.latest_watering
                      ? formatDate(plant.latest_watering)
                      : "Unknown"
                  }
                  nextWateringDue={getNextWateringDate(
                    plant.latest_watering,
                    plant.days_since_watering,
                    wateringSchedule
                  )}
                  isOverdue={isOverdue(
                    plant.days_since_watering,
                    wateringSchedule,
                    hasLastWatered
                  )}
                  daysUntilWatering={
                    plant.days_since_watering
                      ? wateringSchedule - plant.days_since_watering
                      : 0
                  }
                  hasUnknownWateringDate={!hasLastWatered}
                  onWater={() => waterPlant(plant.id)}
                  onEdit={() => handleEditPlant(plant)}
                />
              );
            }}
            cols={{ default: 1, md: 2, lg: 3, xl: 4 }}
            itemDelay={75}
          />
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
