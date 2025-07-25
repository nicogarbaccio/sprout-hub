import { CascadingGrid } from "@/components/ui/cascading-grid";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Droplets, CheckCircle, Clock } from "lucide-react";
import MyPlantCard from "./MyPlantCard";
import EmptyRoomState from "./EmptyRoomState";
import { UserPlant } from "@/hooks/useUserPlants";
import { getRoomIcon, getRoomLabel, getRoomTheme } from "@/utils/rooms";

interface RoomSectionProps {
  roomKey: string;
  plants: UserPlant[];
  onWaterPlant: (plantId: string) => void;
  onEditPlant: (plant: UserPlant) => void;
  onAddPlant: () => void;
  onPostponeWatering?: (plantId: string) => void;
  onViewHistory?: (plant: UserPlant) => void;
  formatDate: (dateString: string) => string;
  getNextWateringDate: (
    lastWatered: string | undefined,
    daysAgo: number | undefined,
    wateringSchedule: number
  ) => string;
  isOverdue: (
    daysAgo: number | undefined,
    wateringSchedule: number,
    hasLastWatered: boolean
  ) => boolean;
  delay: number;
}

const RoomSection = ({
  roomKey,
  plants,
  onWaterPlant,
  onEditPlant,
  onAddPlant,
  onPostponeWatering,
  onViewHistory,
  formatDate,
  getNextWateringDate,
  isOverdue,
  delay,
}: RoomSectionProps) => {
  const roomLabel = getRoomLabel(roomKey);
  const roomIcon = getRoomIcon(roomKey);
  const roomTheme = getRoomTheme(roomKey);

  // Calculate room statistics
  const overdueCount = plants.filter((plant) => {
    if (
      plant.days_since_watering === null ||
      plant.days_since_watering === undefined ||
      !plant.latest_watering
    )
      return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering > wateringSchedule;
  }).length;

  const dueTodayCount = plants.filter((plant) => {
    if (
      plant.days_since_watering === null ||
      plant.days_since_watering === undefined ||
      !plant.latest_watering
    )
      return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering === wateringSchedule;
  }).length;

  const healthyCount = plants.filter((plant) => {
    if (
      plant.days_since_watering === null ||
      plant.days_since_watering === undefined ||
      !plant.latest_watering
    )
      return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering < wateringSchedule;
  }).length;

  const unknownCount = plants.filter((plant) => !plant.latest_watering).length;

  // Room health status
  const getRoomHealthStatus = () => {
    if (overdueCount > 0)
      return {
        status: "needs-attention",
        color: "text-sprout-warning",
        bgColor: "bg-sprout-warning/10",
      };
    if (dueTodayCount > 0)
      return {
        status: "due-today",
        color: "text-sprout-dark",
        bgColor: "bg-sprout-cream/20",
      };
    if (unknownCount > 0)
      return {
        status: "unknown",
        color: "text-neutral-medium",
        bgColor: "bg-neutral-light",
      };
    return {
      status: "healthy",
      color: "text-sprout-success",
      bgColor: "bg-sprout-success/10",
    };
  };

  const roomHealth = getRoomHealthStatus();

  // If no plants in this room, show empty state
  if (plants.length === 0) {
    return (
      <CascadingContainer delay={delay}>
        <div className="mb-12">
          <EmptyRoomState roomKey={roomKey} onAddPlant={onAddPlant} />
        </div>
      </CascadingContainer>
    );
  }

  return (
    <CascadingContainer delay={delay}>
      <div className="mb-12">
        {/* Enhanced Room Header */}
        <div
          className={`${roomTheme.background} ${roomTheme.border} border-2 rounded-2xl p-4 sm:p-6 mb-6 transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`${roomTheme.iconBg} p-2 sm:p-3 rounded-xl`}>
                <span className="text-2xl sm:text-3xl">{roomIcon}</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground font-poppins mb-1">
                  {roomLabel}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {plants.length} plant{plants.length !== 1 ? "s" : ""}
                  </p>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      roomHealth.status === "healthy"
                        ? "bg-green-400"
                        : roomHealth.status === "due-today"
                        ? "bg-yellow-400"
                        : roomHealth.status === "needs-attention"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Room Statistics Badges */}
            <div className="flex flex-wrap gap-2">
              {healthyCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {healthyCount} healthy
                </Badge>
              )}
              {dueTodayCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {dueTodayCount} due today
                </Badge>
              )}
              {overdueCount > 0 && (
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-700 hover:bg-red-100 text-xs"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {overdueCount} overdue
                </Badge>
              )}
              {unknownCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs"
                >
                  <Droplets className="w-3 h-3 mr-1" />
                  {unknownCount} unknown
                </Badge>
              )}
            </div>
          </div>

          {/* Room Health Summary */}
          {(overdueCount > 0 || dueTodayCount > 0) && (
            <div
              className={`mt-4 p-3 ${
                roomHealth.bgColor
              } rounded-lg border-l-4 ${
                roomHealth.status === "needs-attention"
                  ? "border-sprout-warning"
                  : "border-sprout-cream"
              }`}
            >
              <p className={`text-sm font-medium ${roomHealth.color}`}>
                {overdueCount > 0
                  ? `${overdueCount} plant${
                      overdueCount !== 1 ? "s" : ""
                    } need${overdueCount === 1 ? "s" : ""} immediate attention`
                  : `${dueTodayCount} plant${
                      dueTodayCount !== 1 ? "s" : ""
                    } should be watered today`}
              </p>
            </div>
          )}
        </div>

        {/* Plants Grid */}
        <CascadingGrid
          items={plants}
          renderItem={(plant) => {
            const wateringSchedule = plant.suggested_watering_days || 7;
            const hasLastWatered = !!plant.latest_watering;

            // Check if this plant's watering was postponed (watering date is in the future)
            // Since waterPlant now cleans up postponement records, any future date is a valid postponement
            const latestWateringDate = plant.latest_watering
              ? new Date(plant.latest_watering)
              : null;
            const now = new Date();
            const isPostponed = latestWateringDate && latestWateringDate > now;

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
                lastWateredDate={plant.latest_watering}
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
                  plant.days_since_watering !== null &&
                  plant.days_since_watering !== undefined
                    ? wateringSchedule - plant.days_since_watering
                    : 999 // Large number = not due for a long time when no watering data
                }
                hasUnknownWateringDate={!hasLastWatered}
                isPostponed={isPostponed}
                onWater={() => onWaterPlant(plant.id)}
                onEdit={() => onEditPlant(plant)}
                onPostpone={
                  onPostponeWatering
                    ? () => onPostponeWatering(plant.id)
                    : undefined
                }
                onViewHistory={
                  onViewHistory ? () => onViewHistory(plant) : undefined
                }
              />
            );
          }}
          cols={{ default: 1, md: 2, lg: 3, xl: 4 }}
          itemDelay={75}
        />
      </div>
    </CascadingContainer>
  );
};

export default RoomSection;
