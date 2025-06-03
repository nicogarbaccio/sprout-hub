import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Sun,
  Heart,
  MoreVertical,
  Camera,
  Calendar,
  ArrowRight,
  Share2,
  Edit3,
} from "lucide-react";
import { useSwipe, useHaptic } from "@/hooks/use-touch";
import { cn } from "@/lib/utils";

interface MobilePlantCardProps {
  plant: {
    id: string;
    name: string;
    species?: string;
    image_url?: string;
    last_watered?: string;
    next_watering?: string;
    care_difficulty?: "easy" | "medium" | "hard";
    light_requirement?: "low" | "medium" | "high";
    is_favorite?: boolean;
  };
  onWater?: (plantId: string) => void;
  onFavorite?: (plantId: string) => void;
  onEdit?: (plantId: string) => void;
  onShare?: (plantId: string) => void;
  onPhotoAdd?: (plantId: string) => void;
  onView?: (plantId: string) => void;
  className?: string;
}

export function MobilePlantCard({
  plant,
  onWater,
  onFavorite,
  onEdit,
  onShare,
  onPhotoAdd,
  onView,
  className,
}: MobilePlantCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );
  const [showActions, setShowActions] = useState(false);
  const { lightImpact, mediumImpact, success } = useHaptic();

  const swipeHandlers = useSwipe(
    {
      onSwipeLeft: () => {
        setSwipeDirection("left");
        setShowActions(true);
        lightImpact();
        setTimeout(() => {
          setSwipeDirection(null);
          setShowActions(false);
        }, 2000);
      },
      onSwipeRight: () => {
        setSwipeDirection("right");
        setShowActions(true);
        lightImpact();
        setTimeout(() => {
          setSwipeDirection(null);
          setShowActions(false);
        }, 2000);
      },
      onTap: () => {
        if (!showActions) {
          onView?.(plant.id);
          lightImpact();
        }
      },
    },
    {
      threshold: 30,
      deltaXThreshold: 50,
    }
  );

  const handleWater = () => {
    onWater?.(plant.id);
    success();
    setShowActions(false);
  };

  const handleFavorite = () => {
    onFavorite?.(plant.id);
    mediumImpact();
    setShowActions(false);
  };

  const getDaysSinceWatered = () => {
    if (!plant.last_watered) return null;
    const lastWatered = new Date(plant.last_watered);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastWatered.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getWateringStatus = () => {
    const daysSince = getDaysSinceWatered();
    if (!daysSince) return "unknown";
    if (daysSince <= 2) return "good";
    if (daysSince <= 5) return "due";
    return "overdue";
  };

  const wateringStatus = getWateringStatus();
  const daysSinceWatered = getDaysSinceWatered();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Swipe Actions Background */}
      {showActions && (
        <div className="absolute inset-0 z-10 flex">
          {swipeDirection === "left" && (
            <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-6 space-x-4">
              <Button
                onClick={() => onPhotoAdd?.(plant.id)}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Camera className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => onEdit?.(plant.id)}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Edit3 className="w-5 h-5" />
              </Button>
            </div>
          )}
          {swipeDirection === "right" && (
            <div className="w-full bg-gradient-to-l from-green-500 to-green-600 flex items-center justify-start pl-6 space-x-4">
              <Button
                onClick={handleWater}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Droplets className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleFavorite}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    plant.is_favorite ? "fill-white" : ""
                  )}
                />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main Card */}
      <Card
        className={cn(
          "transition-transform duration-200 cursor-pointer active:scale-95",
          showActions &&
            swipeDirection === "left" &&
            "transform translate-x-[-80px]",
          showActions &&
            swipeDirection === "right" &&
            "transform translate-x-[80px]",
          wateringStatus === "overdue" && "border-red-200 bg-red-50/50",
          wateringStatus === "due" && "border-yellow-200 bg-yellow-50/50",
          "hover:shadow-md active:shadow-lg"
        )}
        {...swipeHandlers}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {/* Plant Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                {plant.image_url ? (
                  <img
                    src={plant.image_url}
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Plant Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {plant.name}
                  </h3>
                  {plant.species && (
                    <p className="text-sm text-gray-500 truncate">
                      {plant.species}
                    </p>
                  )}
                </div>

                {/* Favorite indicator */}
                {plant.is_favorite && (
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />
                )}
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-1 mt-2">
                {plant.care_difficulty && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5",
                      plant.care_difficulty === "easy" &&
                        "border-green-200 text-green-700 bg-green-50",
                      plant.care_difficulty === "medium" &&
                        "border-yellow-200 text-yellow-700 bg-yellow-50",
                      plant.care_difficulty === "hard" &&
                        "border-red-200 text-red-700 bg-red-50"
                    )}
                  >
                    {plant.care_difficulty}
                  </Badge>
                )}

                {plant.light_requirement && (
                  <Badge
                    variant="outline"
                    className="text-xs px-2 py-0.5 border-blue-200 text-blue-700 bg-blue-50"
                  >
                    <Sun className="w-3 h-3 mr-1" />
                    {plant.light_requirement}
                  </Badge>
                )}
              </div>

              {/* Watering Status */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Droplets
                    className={cn(
                      "w-4 h-4",
                      wateringStatus === "good" && "text-green-500",
                      wateringStatus === "due" && "text-yellow-500",
                      wateringStatus === "overdue" && "text-red-500",
                      wateringStatus === "unknown" && "text-gray-400"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      wateringStatus === "good" && "text-green-700",
                      wateringStatus === "due" && "text-yellow-700",
                      wateringStatus === "overdue" && "text-red-700",
                      wateringStatus === "unknown" && "text-gray-500"
                    )}
                  >
                    {daysSinceWatered
                      ? `${daysSinceWatered} day${
                          daysSinceWatered > 1 ? "s" : ""
                        } ago`
                      : "Not tracked"}
                  </span>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swipe instruction hint */}
      {!showActions && (
        <div className="absolute bottom-1 right-1 opacity-30">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
}

// Quick actions overlay for when swipe isn't available
export function PlantQuickActions({
  plant,
  onWater,
  onFavorite,
  onEdit,
  onShare,
  onPhotoAdd,
  className,
}: {
  plant: { id: string; is_favorite?: boolean };
  onWater?: (plantId: string) => void;
  onFavorite?: (plantId: string) => void;
  onEdit?: (plantId: string) => void;
  onShare?: (plantId: string) => void;
  onPhotoAdd?: (plantId: string) => void;
  className?: string;
}) {
  const { mediumImpact, success } = useHaptic();

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        onClick={() => {
          onWater?.(plant.id);
          success();
        }}
        size="sm"
        variant="outline"
        className="text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <Droplets className="w-4 h-4 mr-1" />
        Water
      </Button>

      <Button
        onClick={() => {
          onFavorite?.(plant.id);
          mediumImpact();
        }}
        size="sm"
        variant="outline"
        className={cn(
          "border-red-200 hover:bg-red-50",
          plant.is_favorite ? "text-red-600 bg-red-50" : "text-gray-600"
        )}
      >
        <Heart
          className={cn(
            "w-4 h-4",
            plant.is_favorite ? "fill-red-500 text-red-500" : ""
          )}
        />
      </Button>

      <Button
        onClick={() => onPhotoAdd?.(plant.id)}
        size="sm"
        variant="outline"
        className="text-green-600 border-green-200 hover:bg-green-50"
      >
        <Camera className="w-4 h-4" />
      </Button>
    </div>
  );
}
