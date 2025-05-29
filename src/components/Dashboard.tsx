import { useState } from "react";
import {
  Plus,
  Droplets,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  Flower2,
  CheckCircle,
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
import { useUserPlants } from "@/hooks/useUserPlants";
import { useProfile } from "@/hooks/useProfile";
import AddPlantDialog from "./AddPlantDialog";
import { format, formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const { plants, loading, waterPlant } = useUserPlants();
  const { profileData, isLoadingProfile } = useProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading || isLoadingProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-plant-text">Loading your dashboard...</div>
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

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-plant-text mb-2 font-poppins">
            {greeting} 🌱
          </h1>
          <p className="text-plant-text/60 text-lg">
            Here's how your plants are doing today
          </p>
        </div>

        {/* Quick Actions */}
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
              // Quick water multiple plants functionality could be added here
              window.scrollTo({
                top: document.getElementById("todays-tasks")?.offsetTop,
                behavior: "smooth",
              });
            }}
          >
            <Droplets className="w-6 h-6 mr-3" />
            Water Plants
          </Button>
        </div>

        {/* Care Status Overview */}
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
                          <img
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
                      <img
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

        {/* Plant Health Insights */}
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
                      {totalPlants - plantsWithoutWateringData - overduePlants}/
                      {totalPlants}
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
                        {plantsWithoutWateringData > 1 ? "s" : ""} need initial
                        watering data
                      </p>
                    </div>
                  )}
                  {overduePlants === 0 &&
                    plantsWithoutWateringData === 0 &&
                    totalPlants > 0 && (
                      <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-700">
                          Great job! All your plants are well cared for. Keep up
                          the excellent work!
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

        {/* Quick Plant Gallery */}
        {favoritePlants.length > 0 && (
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
                      <img
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
        )}

        <AddPlantDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
