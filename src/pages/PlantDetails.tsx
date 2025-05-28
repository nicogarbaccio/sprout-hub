
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import AddPlantDialog from "@/components/AddPlantDialog";
import PlantDetailsHeader from "@/components/plant-details/PlantDetailsHeader";
import PlantImageSection from "@/components/plant-details/PlantImageSection";
import PlantInfoSection from "@/components/plant-details/PlantInfoSection";
import PlantCareGrid from "@/components/plant-details/PlantCareGrid";
import PlantCareCards from "@/components/plant-details/PlantCareCards";
import Footer from "@/components/Footer";
import { plants } from "@/data/plantData";

const PlantDetails = () => {
  const { plantName } = useParams();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Find the plant in the plant data by matching the name
  const plant = plants.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === plantName?.toLowerCase()
  );

  const handleAddToCollection = () => {
    if (plant) {
      setIsAddDialogOpen(true);
    }
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  if (!plant) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-12 text-center">
            <h1 className="text-2xl font-bold text-plant-text mb-4">
              Plant Not Found
            </h1>
            <PlantDetailsHeader
              onBackClick={() => navigate("/plant-catalog")}
            />
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
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PlantDetailsHeader onBackClick={() => navigate("/plant-catalog")} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PlantImageSection image={plant.image} name={plant.name} />

            <div className="space-y-6">
              <PlantInfoSection
                name={plant.name}
                botanicalName={plant.botanicalName}
                description={plant.description || `The ${plant.name} is a beautiful plant that makes a great addition to any home. It's known for its unique characteristics and is perfect for plant enthusiasts.`}
                careLevel={plant.careLevel}
                toxicity={plant.toxicity || "Unknown - consult a veterinarian"}
                onAddToCollection={handleAddToCollection}
              />

              <PlantCareGrid
                wateringFrequency={plant.wateringFrequency}
                suggestedWateringDays={plant.suggestedWateringDays || 7}
                lightRequirement={plant.lightRequirement}
                temperature={plant.temperature || "65-75°F (18-24°C)"}
                humidity={plant.humidity || "40-60%"}
              />
            </div>
          </div>

          <PlantCareCards
            careInstructions={careInstructions}
            commonProblems={commonProblems}
          />
        </div>
      </div>

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
      <Footer />
    </div>
  );
};

export default PlantDetails;
