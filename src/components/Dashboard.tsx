import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Droplets,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Flower2,
  CheckCircle,
  CheckCircle2,
  Target,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DashboardMetricSkeleton,
  DashboardTaskSkeleton,
  DashboardActivitySkeleton,
  Skeleton,
} from "@/components/ui/skeleton";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { useGracefulLoading } from "@/hooks/useGracefulLoading";
import { useUserPlants } from "@/hooks/useUserPlants";
import { useProfile } from "@/hooks/useProfile";
import AddPlantDialog from "./AddPlantDialog";
import PlantImage from "@/components/ui/plant-image";
import { format, formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { plants, loading, waterPlant } = useUserPlants();
  const { profileData, isLoadingProfile } = useProfile();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isBulkWaterDialogOpen, setIsBulkWaterDialogOpen] = useState(false);

  const isLoading = loading || isLoadingProfile;

  const { showLoading, isReady } = useGracefulLoading(isLoading, {
    minLoadingTime: 600,
    staggerDelay: 150,
  });

  if (showLoading) {
    return (
      <div className="py-8 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-10 w-80 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>

          {/* Quick Actions Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>

          {/* Care Status Overview Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardMetricSkeleton />
            <DashboardMetricSkeleton />
            <DashboardMetricSkeleton />
            <DashboardMetricSkeleton />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Today's Tasks Skeleton */}
            <Card className="border-plant-secondary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-2 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <DashboardTaskSkeleton />
                  <DashboardTaskSkeleton />
                  <DashboardTaskSkeleton />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Skeleton */}
            <Card className="border-plant-secondary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton className="w-5 h-5 mr-2 rounded-full" />
                  <Skeleton className="h-6 w-36" />
                </div>
                <Skeleton className="h-4 w-52" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <DashboardActivitySkeleton />
                  <DashboardActivitySkeleton />
                  <DashboardActivitySkeleton />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plant Health Insights Skeleton */}
          <Card className="border-plant-secondary/20 mb-8">
            <CardHeader>
              <div className="flex items-center">
                <Skeleton className="w-5 h-5 mr-2 rounded-full" />
                <Skeleton className="h-6 w-44" />
              </div>
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-6 w-28" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Plants Skeleton */}
          <Card className="border-plant-secondary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <Skeleton className="w-5 h-5 mr-2 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-48 mt-2" />
                </div>
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg"
                  >
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="py-8 bg-white min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0">
          {/* Invisible content to maintain height */}
          <div className="mb-8">
            <div className="h-10 w-80 mb-2" />
            <div className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="h-16" />
            <div className="h-16" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="h-24" />
            <div className="h-24" />
            <div className="h-24" />
            <div className="h-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-80" />
            <div className="h-80" />
          </div>
          <div className="h-96 mb-8" />
          <div className="h-64" />
        </div>
      </div>
    );
  }

  // Get the user's first name, with fallback to "plant parent"
  const firstName = profileData.first_name?.trim();
  const greeting = firstName
    ? `Welcome back, ${firstName}!`
    : "Welcome back, plant parent!";

  // Calculate care statistics
  const totalPlants = plants.length;
  const plantsWithoutWateringData = plants.filter(
    (plant) => !plant.latest_watering
  ).length;

  const plantsNeedingWaterToday = plants.filter((plant) => {
    if (!plant.latest_watering || !plant.days_since_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering >= wateringSchedule;
  }).length;

  const overduePlants = plants.filter((plant) => {
    if (!plant.latest_watering || !plant.days_since_watering) return false;
    const wateringSchedule = plant.suggested_watering_days || 7;
    return plant.days_since_watering > wateringSchedule;
  }).length;

  const recentlyAddedCount = plants.filter((plant) => {
    const plantDate = new Date(plant.created_at);
    const daysDiff = Math.floor(
      (Date.now() - plantDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff <= 7;
  }).length;

  // Get plants needing water today (for task list)
  const plantsNeedingWater = plants
    .filter((plant) => {
      if (!plant.latest_watering || !plant.days_since_watering) return false;
      const wateringSchedule = plant.suggested_watering_days || 7;
      return plant.days_since_watering >= wateringSchedule;
    })
    .sort(
      (a, b) => (b.days_since_watering || 0) - (a.days_since_watering || 0)
    );

  // Get recent activities (recently watered plants)
  const recentlyWateredPlants = plants
    .filter((plant) => plant.latest_watering)
    .sort(
      (a, b) =>
        new Date(b.latest_watering!).getTime() -
        new Date(a.latest_watering!).getTime()
    )
    .slice(0, 5);

  // Get favorite plants (most recently cared for)
  const favoritePlants = plants
    .filter((plant) => plant.latest_watering)
    .sort(
      (a, b) =>
        new Date(b.latest_watering!).getTime() -
        new Date(a.latest_watering!).getTime()
    )
    .slice(0, 4);

  const handleQuickWater = async (plantId: string, plantName: string) => {
    const success = await waterPlant(plantId, `Quick watered from dashboard`);
    if (success) {
      // Optionally show a success message or update UI
    }
  };

  const handleBulkWater = async () => {
    setIsBulkWaterDialogOpen(false);

    // Water all plants that need watering today
    const waterPromises = plantsNeedingWater.map((plant) =>
      waterPlant(plant.id, `Bulk watered from dashboard`)
    );

    try {
      await Promise.all(waterPromises);
      // Success feedback will be handled by the useUserPlants hook
    } catch (error) {
      console.error("Error bulk watering plants:", error);
    }
  };

  return (
    <div className="py-8 bg-white min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <CascadingContainer delay={0}>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-plant-text mb-2 font-poppins">
              {greeting} 🌱
            </h1>
            <p className="text-plant-text/60 text-lg">
              Here's how your plants are doing today
            </p>
          </div>
        </CascadingContainer>

        {/* Quick Actions */}
        <CascadingContainer delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="h-16 bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl font-medium text-lg"
              size="lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              Add New Plant
            </Button>

            <Button
              variant="outline"
              className="h-16 bg-plant-water text-white rounded-xl font-medium text-lg hover:bg-plant-water/90 hover:text-white border-plant-water"
              size="lg"
              onClick={() => {
                if (plantsNeedingWater.length > 0) {
                  setIsBulkWaterDialogOpen(true);
                } else {
                  navigate("/my-plants");
                }
              }}
            >
              {plantsNeedingWater.length > 0 ? (
                <>
                  <Droplets className="w-6 h-6 mr-3" />
                  Water {plantsNeedingWater.length} Plant
                  {plantsNeedingWater.length > 1 ? "s" : ""}
                </>
              ) : (
                <>
                  <Flower2 className="w-6 h-6 mr-3" />
                  View All Plants
                </>
              )}
            </Button>
          </div>
        </CascadingContainer>

        {/* Care Status Overview */}
        <CascadingContainer delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-plant-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-plant-text/60 mb-1">
                      Total Plants
                    </p>
                    <p className="text-3xl font-bold text-plant-text">
                      {totalPlants}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-plant-secondary/20 rounded-full flex items-center justify-center">
                    <Flower2 className="w-6 h-6 text-plant-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-plant-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-plant-text/60 mb-1">
                      Need Water Today
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {plantsNeedingWaterToday}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-plant-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-plant-text/60 mb-1">Overdue</p>
                    <p className="text-3xl font-bold text-red-600">
                      {overduePlants}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-plant-secondary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-plant-text/60 mb-1">
                      New This Week
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {recentlyAddedCount}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CascadingContainer>

        <CascadingContainer delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Today's Tasks */}
            <Card id="todays-tasks" className="border-plant-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-plant-text">
                  <Calendar className="w-5 h-5 mr-2 text-plant-primary" />
                  Today's Tasks
                </CardTitle>
                <CardDescription>
                  Plants that need your attention today
                </CardDescription>
              </CardHeader>
              <CardContent>
                {plantsNeedingWater.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-plant-text/60">
                      All caught up! No plants need watering today.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plantsNeedingWater.slice(0, 5).map((plant) => {
                      const isOverdue =
                        plant.days_since_watering! >
                        (plant.suggested_watering_days || 7);
                      return (
                        <div
                          key={plant.id}
                          className="flex items-center justify-between p-3 bg-plant-neutral rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <PlantImage
                              src={
                                plant.image ||
                                "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=60&h=60&fit=crop"
                              }
                              alt={plant.nickname}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-plant-text">
                                {plant.nickname}
                              </p>
                              <p className="text-sm text-plant-text/60">
                                {plant.plant_type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isOverdue ? (
                              <Badge variant="destructive" className="text-xs">
                                {plant.days_since_watering} days overdue
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Due today
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              onClick={() =>
                                handleQuickWater(plant.id, plant.nickname)
                              }
                              className="bg-plant-water text-white hover:bg-plant-water/90 hover:text-white"
                            >
                              <Droplets className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    {plantsNeedingWater.length > 5 && (
                      <p className="text-sm text-plant-text/60 text-center pt-2">
                        +{plantsNeedingWater.length - 5} more plants need
                        attention
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card className="border-plant-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-plant-text">
                  <Activity className="w-5 h-5 mr-2 text-plant-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest plant care activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentlyWateredPlants.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-plant-text/30 mx-auto mb-3" />
                    <p className="text-plant-text/60">
                      No recent activity. Start caring for your plants!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentlyWateredPlants.map((plant) => (
                      <div
                        key={plant.id}
                        className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg"
                      >
                        <PlantImage
                          src={
                            plant.image ||
                            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=40&h=40&fit=crop"
                          }
                          alt={plant.nickname}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-plant-text">
                            Watered{" "}
                            <span className="font-semibold">
                              {plant.nickname}
                            </span>
                          </p>
                          <p className="text-xs text-plant-text/60">
                            {formatDistanceToNow(
                              new Date(plant.latest_watering!),
                              { addSuffix: true }
                            )}
                          </p>
                        </div>
                        <Droplets className="w-4 h-4 text-plant-primary" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CascadingContainer>

        {/* Plant Health Insights */}
        <CascadingContainer delay={400}>
          <Card className="border-plant-secondary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-plant-text">
                <Target className="w-5 h-5 mr-2 text-plant-primary" />
                Plant Health Insights
              </CardTitle>
              <CardDescription>
                Recommendations to keep your plants thriving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-plant-text">
                    Health Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-plant-text/60">
                        Plants with regular care
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {totalPlants -
                          plantsWithoutWateringData -
                          overduePlants}
                        /{totalPlants}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-plant-text/60">
                        Overdue for watering
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {overduePlants}/{totalPlants}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-plant-text/60">
                        Unknown watering schedule
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {plantsWithoutWateringData}/{totalPlants}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-plant-text">
                    Recommendations
                  </h4>
                  <div className="space-y-2">
                    {overduePlants > 0 && (
                      <div className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-700">
                          {overduePlants} plant{overduePlants > 1 ? "s" : ""}{" "}
                          overdue for watering - check them soon!
                        </p>
                      </div>
                    )}
                    {plantsWithoutWateringData > 0 && (
                      <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          {plantsWithoutWateringData} plant
                          {plantsWithoutWateringData > 1 ? "s" : ""} need
                          initial watering data
                        </p>
                      </div>
                    )}
                    {overduePlants === 0 &&
                      plantsWithoutWateringData === 0 &&
                      totalPlants > 0 && (
                        <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-green-700">
                            Great job! All your plants are well cared for. Keep
                            up the excellent work!
                          </p>
                        </div>
                      )}
                    {totalPlants === 0 && (
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700 mb-3">
                          Start your plant journey by adding your first plant!
                        </p>
                        <Button
                          onClick={() => setIsAddDialogOpen(true)}
                          className="bg-plant-primary hover:bg-plant-primary/90 text-white"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Plant
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CascadingContainer>

        {/* Quick Plant Gallery */}
        {favoritePlants.length > 0 && (
          <CascadingContainer delay={500}>
            <Card className="border-plant-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-plant-text">
                  <Flower2 className="w-5 h-5 mr-2 text-plant-primary" />
                  Your Plant Gallery
                </CardTitle>
                <CardDescription>
                  Your most recently cared for plants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {favoritePlants.map((plant) => (
                    <div key={plant.id} className="group cursor-pointer">
                      <div className="aspect-square bg-plant-neutral rounded-lg overflow-hidden mb-2">
                        <PlantImage
                          src={
                            plant.image ||
                            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=200&h=200&fit=crop"
                          }
                          alt={plant.nickname}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-plant-text text-center">
                        {plant.nickname}
                      </p>
                      <p className="text-xs text-plant-text/60 text-center">
                        {plant.plant_type}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CascadingContainer>
        )}

        <AddPlantDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />

        <AlertDialog
          open={isBulkWaterDialogOpen}
          onOpenChange={setIsBulkWaterDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-plant-water" />
                Water Multiple Plants
              </AlertDialogTitle>
              <AlertDialogDescription>
                You're about to water {plantsNeedingWater.length} plant
                {plantsNeedingWater.length > 1 ? "s" : ""} that need attention
                today:
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="max-h-48 overflow-y-auto space-y-2 my-4">
              {plantsNeedingWater.map((plant) => (
                <div
                  key={plant.id}
                  className="flex items-center space-x-3 p-2 bg-plant-neutral rounded-lg"
                >
                  <PlantImage
                    src={
                      plant.image ||
                      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=40&h=40&fit=crop"
                    }
                    alt={plant.nickname}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-plant-text">
                      {plant.nickname}
                    </p>
                    <p className="text-xs text-plant-text/60">
                      {plant.plant_type}
                    </p>
                  </div>
                  <Badge
                    variant={
                      plant.days_since_watering! >
                      (plant.suggested_watering_days || 7)
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {plant.days_since_watering! >
                    (plant.suggested_watering_days || 7)
                      ? `${plant.days_since_watering} days overdue`
                      : "Due today"}
                  </Badge>
                </div>
              ))}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleBulkWater}
                className="bg-plant-water hover:bg-plant-water/90 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Water All Plants
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Dashboard;
