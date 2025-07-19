import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import AddPlantDialog from "@/components/AddPlantDialog";
import PlantDetailsHeader from "@/components/plant-details/PlantDetailsHeader";
import PlantImageSection from "@/components/plant-details/PlantImageSection";
import PlantInfoSection from "@/components/plant-details/PlantInfoSection";
import PlantCareGrid from "@/components/plant-details/PlantCareGrid";
import PlantCareCards from "@/components/plant-details/PlantCareCards";
import Footer from "@/components/Footer";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { useGracefulLoading } from "@/hooks/useGracefulLoading";
import { Skeleton } from "@/components/ui/skeleton";
import { plants } from "@/data/plantData";

const PlantDetails = () => {
  const { plantName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Simulate loading state (in a real app, this would be actual data fetching)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [plantName]);

  const { showLoading, isReady } = useGracefulLoading(isLoading, {
    minLoadingTime: 0,
    staggerDelay: 0,
  });

  // Find the plant in the plant data by matching the name
  const plant = plants.find(
    (p) =>
      p.name.toLowerCase().replace(/\s+/g, "-") === plantName?.toLowerCase()
  );

  const handleAddToCollection = () => {
    if (plant) {
      setIsAddDialogOpen(true);
    }
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleSignInToAdd = () => {
    const currentPath = encodeURIComponent(location.pathname);
    navigate(`/auth?redirect=${currentPath}`);
  };

  // Show loading skeleton
  if (showLoading) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navigation />
        <div className="pt-16 min-h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back button skeleton */}
            <Skeleton className="h-10 w-32 mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Image skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-80 w-full rounded-lg" />
              </div>

              <div className="space-y-6">
                {/* Plant info skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-12 w-48 rounded-xl" />
                </div>

                {/* Care grid skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Care cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
              <div className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navigation />
        <div className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-12 text-center">
            <CascadingContainer delay={0}>
              <h1 className="text-2xl font-bold text-plant-text mb-4">
                Plant Not Found
              </h1>
              <PlantDetailsHeader
                onBackClick={() => navigate("/plant-catalog")}
              />
            </CascadingContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navigation />
        <div className="pt-16 min-h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 opacity-0">
            {/* Invisible content to maintain height */}
            <div className="h-10 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="h-80" />
              <div className="space-y-6">
                <div className="h-32" />
                <div className="h-24" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64" />
              <div className="h-64" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Create default care instructions and common problems if not provided
  const careInstructions = plant.careInstructions || [
    "Water when top inch of soil feels dry",
    "Place in appropriate light conditions",
    "Maintain proper humidity levels",
    "Remove dead or yellowing leaves",
    "Fertilize during growing season",
  ];

  const commonProblems = plant.commonProblems || [
    "Overwatering: Yellow leaves and root rot",
    "Underwatering: Wilting and dry soil",
    "Poor lighting: Leggy growth or leaf drop",
    "Low humidity: Brown leaf tips",
  ];

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CascadingContainer delay={0}>
            <PlantDetailsHeader
              onBackClick={() => navigate("/plant-catalog")}
            />
          </CascadingContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CascadingContainer delay={100}>
              <PlantImageSection image={plant.image} name={plant.name} />
            </CascadingContainer>

            <div className="space-y-6">
              <CascadingContainer delay={200}>
                <PlantInfoSection
                  name={plant.name}
                  botanicalName={plant.botanicalName}
                  description={
                    plant.description ||
                    `The ${plant.name} is a beautiful plant that makes a great addition to any home. It's known for its unique characteristics and is perfect for plant enthusiasts.`
                  }
                  careLevel={plant.careLevel}
                  toxicity={
                    plant.toxicity || "Unknown - consult a veterinarian"
                  }
                  onAddToCollection={handleAddToCollection}
                  isAuthenticated={!!user}
                  onSignInToAdd={handleSignInToAdd}
                />
              </CascadingContainer>

              <CascadingContainer delay={300}>
                <PlantCareGrid
                  wateringFrequency={plant.wateringFrequency}
                  suggestedWateringDays={plant.suggestedWateringDays || 7}
                  lightRequirement={plant.lightRequirement}
                  temperature={plant.temperature || "65-75°F (18-24°C)"}
                  humidity={plant.humidity || "40-60%"}
                />
              </CascadingContainer>
            </div>
          </div>

          <CascadingContainer delay={400}>
            <PlantCareCards
              careInstructions={careInstructions}
              commonProblems={commonProblems}
            />
          </CascadingContainer>
        </div>
      </div>

      {user && (
        <AddPlantDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
          plantData={{
            name: plant.name,
            botanicalName: plant.botanicalName,
            image: plant.image,
            wateringFrequency: plant.wateringFrequency,
            suggestedWateringDays: plant.suggestedWateringDays,
            lightRequirement: plant.lightRequirement,
            careLevel: plant.careLevel,
          }}
        />
      )}
      <Footer />
    </div>
  );
};

export default PlantDetails;
