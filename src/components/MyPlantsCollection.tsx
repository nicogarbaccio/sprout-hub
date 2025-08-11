import { useState } from "react";
import { Plus, Edit, Droplets, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyPlantCardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { CascadingGrid } from "@/components/ui/cascading-grid";
import { useGracefulLoading } from "@/hooks/useGracefulLoading";
import MyPlantCard from "./MyPlantCard";
import RoomSection from "./RoomSection";
import EditPlantDialog from "./EditPlantDialog";
import AddPlantDialog from "./AddPlantDialog";
import WateringHistoryDialog from "./WateringHistoryDialog";
import { useUserPlants, UserPlant } from "@/hooks/useUserPlants";
import { useAuth } from "@/contexts/AuthContext";
import { groupPlantsByRoom } from "@/utils/rooms";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MyPlantsCollection = () => {
  const { user } = useAuth();
  const { plants, loading, fetchPlants, waterPlant, postponeWatering, overwateringByPlantId } =
    useUserPlants();
  const [editingPlant, setEditingPlant] = useState<UserPlant | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [historyPlant, setHistoryPlant] = useState<UserPlant | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const { showLoading, isReady } = useGracefulLoading(loading, {
    minLoadingTime: 0,
    staggerDelay: 0,
  });

  if (!user) {
    return null;
  }

  if (showLoading) {
    return (
      <section className="py-20 bg-background min-h-[calc(100vh-4rem)]">
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
      <section className="py-20 bg-background min-h-[calc(100vh-4rem)]">
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

  const overwateringCount = plants.filter((p) => {
    const risk = overwateringByPlantId[p.id];
    return risk && risk.level !== 'none';
  }).length;

  // Room statistics
  const roomGroups = groupPlantsByRoom(plants);
  const roomCount = Object.keys(roomGroups).length;

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

  const handleViewHistory = (plant: UserPlant) => {
    setHistoryPlant(plant);
    setIsHistoryDialogOpen(true);
  };

  const handleCloseHistoryDialog = () => {
    setIsHistoryDialogOpen(false);
    setHistoryPlant(null);
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
    <section className="py-20 bg-background min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CascadingContainer delay={0}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-poppins">
                My Plant Collection
              </h2>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-sprout-medium text-white px-3 py-1 rounded-full">
                  {plants.length} plants total
                </span>
                {roomCount > 0 && (
                  <span className="bg-sprout-water text-white px-3 py-1 rounded-full">
                    {roomCount} room{roomCount !== 1 ? "s" : ""}
                  </span>
                )}
                {overdueCount > 0 && (
                  <span className="bg-sprout-error text-white px-3 py-1 rounded-full">
                    {overdueCount} overdue
                  </span>
                )}
                {dueToday > 0 && (
                  <span className="bg-sprout-warning text-white px-3 py-1 rounded-full">
                    {dueToday} due today
                  </span>
                )}
                {unknownWateringCount > 0 && (
                  <span className="bg-neutral-light text-neutral-dark px-3 py-1 rounded-full">
                    {unknownWateringCount} unknown schedule
                  </span>
                )}
                {overwateringCount > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full cursor-help">
                          {overwateringCount} overwatering risk
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          We flag possible overwatering when a plant is watered 2+ times within its suggested window (e.g., 7 days), or when the average interval is less than half the suggested days.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <Button
              onClick={handleAddPlant}
              className="bg-sprout-success hover:bg-sprout-success/90 text-white rounded-xl mt-4 md:mt-0 font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Plant
            </Button>
          </div>
        </CascadingContainer>

        {plants.length === 0 ? (
          <CascadingContainer delay={200}>
            <div className="bg-gradient-to-br from-plant-secondary/10 to-plant-primary/5 rounded-3xl p-12 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-plant-primary to-plant-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <img
                  src="/LogoDark.svg"
                  alt="SproutHub Logo"
                  className="w-20 h-20"
                />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 font-poppins">
                Welcome to Your Plant Collection
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your journey as a plant parent! Track watering schedules,
                organize plants by room, and watch your green family grow.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 bg-sprout-water/20 rounded-full flex items-center justify-center mb-3">
                    <Droplets className="w-6 h-6 text-sprout-water" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Smart Watering
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Never forget to water with personalized schedules
                  </p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 bg-sprout-light/20 rounded-full flex items-center justify-center mb-3">
                    <Home className="w-6 h-6 text-amber-100" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Room Organization
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Organize plants by location in your home
                  </p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Growth Tracking
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Monitor your plants' health and progress
                  </p>
                </div>
              </div>

              <Button
                onClick={handleAddPlant}
                size="lg"
                className="bg-sprout-success hover:bg-sprout-success/90 text-plant-primary dark:text-white rounded-xl px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Plant
              </Button>
            </div>
          </CascadingContainer>
        ) : (
          <>
            {/* Render Plants by Room */}
            {Object.entries(groupPlantsByRoom(plants)).map(
              ([roomKey, roomPlants], index) => (
                <RoomSection
                  key={roomKey}
                  roomKey={roomKey}
                  plants={roomPlants}
                  onWaterPlant={waterPlant}
                  onEditPlant={handleEditPlant}
                  onAddPlant={handleAddPlant}
                  onPostponeWatering={postponeWatering}
                  onViewHistory={handleViewHistory}
                  formatDate={formatDate}
                  getNextWateringDate={getNextWateringDate}
                  isOverdue={isOverdue}
                  delay={200 + index * 100}
                  overwateringByPlantId={overwateringByPlantId}
                />
              )
            )}
          </>
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
          onPlantAdded={fetchPlants}
        />

        <WateringHistoryDialog
          plant={historyPlant}
          isOpen={isHistoryDialogOpen}
          onClose={handleCloseHistoryDialog}
        />
      </div>
    </section>
  );
};

export default MyPlantsCollection;
