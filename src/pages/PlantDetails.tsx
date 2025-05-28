
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import AddPlantDialog from '@/components/AddPlantDialog';
import PlantDetailsHeader from '@/components/plant-details/PlantDetailsHeader';
import PlantImageSection from '@/components/plant-details/PlantImageSection';
import PlantInfoSection from '@/components/plant-details/PlantInfoSection';
import PlantCareGrid from '@/components/plant-details/PlantCareGrid';
import PlantCareCards from '@/components/plant-details/PlantCareCards';

const PlantDetails = () => {
  const { plantName } = useParams();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Plant data (in a real app, this would come from a database or API)
  const plantsData = {
    'peace-lily': {
      name: 'Peace Lily',
      botanicalName: 'Spathiphyllum wallisii',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop',
      wateringFrequency: 'Weekly',
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy',
      description: 'The Peace Lily is an elegant houseplant known for its glossy green leaves and distinctive white flowers. It\'s perfect for beginners and thrives in lower light conditions.',
      temperature: '65-80°F (18-27°C)',
      humidity: '40-60%',
      toxicity: 'Toxic to pets',
      careInstructions: [
        'Water when top inch of soil feels dry',
        'Place in bright, indirect light',
        'Mist leaves regularly to increase humidity',
        'Remove spent flowers and yellowing leaves',
        'Fertilize monthly during growing season'
      ],
      commonProblems: [
        'Brown leaf tips: Usually caused by low humidity or fluoride in water',
        'Yellowing leaves: Often indicates overwatering',
        'No flowers: Needs more light or maturity'
      ]
    },
    'monstera-deliciosa': {
      name: 'Monstera Deliciosa',
      botanicalName: 'Monstera deliciosa',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=400&fit=crop',
      wateringFrequency: 'Bi-weekly',
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium',
      description: 'Known for its dramatic split leaves, the Monstera Deliciosa is a stunning tropical plant that makes a bold statement in any room.',
      temperature: '65-85°F (18-29°C)',
      humidity: '50-70%',
      toxicity: 'Toxic to pets',
      careInstructions: [
        'Water when top 2 inches of soil are dry',
        'Provide bright, indirect light',
        'Use a moss pole for support as it grows',
        'Wipe leaves clean regularly',
        'Fertilize monthly in spring and summer'
      ],
      commonProblems: [
        'Small leaves: Insufficient light',
        'No splits in leaves: Plant needs more light or maturity',
        'Root rot: Overwatering or poor drainage'
      ]
    },
    'snake-plant': {
      name: 'Snake Plant',
      botanicalName: 'Sansevieria trifasciata',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
      wateringFrequency: 'Monthly',
      lightRequirement: 'Low Light',
      careLevel: 'Easy',
      description: 'The Snake Plant is virtually indestructible and perfect for beginners. Its upright, sword-like leaves add architectural interest to any space.',
      temperature: '60-80°F (15-27°C)',
      humidity: '30-50%',
      toxicity: 'Toxic to pets',
      careInstructions: [
        'Water sparingly, allow soil to dry completely',
        'Tolerates low light but prefers bright, indirect light',
        'Dust leaves regularly',
        'Rarely needs repotting',
        'Fertilize 2-3 times per year'
      ],
      commonProblems: [
        'Soft, mushy leaves: Overwatering',
        'Wrinkled leaves: Underwatering (rare)',
        'Brown tips: Low humidity or fluoride in water'
      ]
    }
  };

  const plantKey = plantName?.toLowerCase().replace(/\s+/g, '-');
  const plant = plantKey ? plantsData[plantKey as keyof typeof plantsData] : null;

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
            <h1 className="text-2xl font-bold text-plant-text mb-4">Plant Not Found</h1>
            <PlantDetailsHeader onBackClick={() => navigate('/plant-catalog')} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PlantDetailsHeader onBackClick={() => navigate('/plant-catalog')} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PlantImageSection image={plant.image} name={plant.name} />
            
            <div className="space-y-6">
              <PlantInfoSection
                name={plant.name}
                botanicalName={plant.botanicalName}
                description={plant.description}
                careLevel={plant.careLevel}
                toxicity={plant.toxicity}
                onAddToCollection={handleAddToCollection}
              />

              <PlantCareGrid
                wateringFrequency={plant.wateringFrequency}
                lightRequirement={plant.lightRequirement}
                temperature={plant.temperature}
                humidity={plant.humidity}
              />
            </div>
          </div>

          <PlantCareCards
            careInstructions={plant.careInstructions}
            commonProblems={plant.commonProblems}
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
          lightRequirement: plant.lightRequirement,
          careLevel: plant.careLevel
        }}
      />
    </div>
  );
};

export default PlantDetails;
