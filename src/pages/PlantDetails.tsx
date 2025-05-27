
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplets, Sun, Thermometer, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const PlantDetails = () => {
  const { plantName } = useParams();
  const navigate = useNavigate();

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

  const getCareColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddToCollection = () => {
    console.log(`Adding ${plant?.name} to collection`);
    // TODO: Implement add to collection functionality
  };

  if (!plant) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <Navigation />
        <div className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-12 text-center">
            <h1 className="text-2xl font-bold text-plant-text mb-4">Plant Not Found</h1>
            <Button onClick={() => navigate('/plant-catalog')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
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
          <Button 
            onClick={() => navigate('/plant-catalog')} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={plant.image} 
                alt={plant.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-plant-text font-poppins">{plant.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCareColor(plant.careLevel)}`}>
                    {plant.careLevel}
                  </span>
                </div>
                <p className="text-lg text-plant-text/60 italic mb-4">{plant.botanicalName}</p>
                <p className="text-plant-text leading-relaxed">{plant.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg">
                  <Droplets className="w-5 h-5 text-plant-primary" />
                  <div>
                    <p className="text-sm text-plant-text/60">Watering</p>
                    <p className="text-sm font-medium text-plant-text">{plant.wateringFrequency}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg">
                  <Sun className="w-5 h-5 text-plant-primary" />
                  <div>
                    <p className="text-sm text-plant-text/60">Light</p>
                    <p className="text-sm font-medium text-plant-text">{plant.lightRequirement}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg">
                  <Thermometer className="w-5 h-5 text-plant-primary" />
                  <div>
                    <p className="text-sm text-plant-text/60">Temperature</p>
                    <p className="text-sm font-medium text-plant-text">{plant.temperature}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-plant-neutral rounded-lg">
                  <Clock className="w-5 h-5 text-plant-primary" />
                  <div>
                    <p className="text-sm text-plant-text/60">Humidity</p>
                    <p className="text-sm font-medium text-plant-text">{plant.humidity}</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleAddToCollection}
                className="w-full bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl font-medium py-3"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to My Collection
              </Button>
              
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700">
                  <strong>Pet Safety:</strong> {plant.toxicity}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-plant-text">Care Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plant.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-plant-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-plant-text text-sm">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-plant-text">Common Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plant.commonProblems.map((problem, index) => (
                    <li key={index} className="text-plant-text text-sm">
                      <span className="font-medium">{problem.split(':')[0]}:</span>
                      <span className="text-plant-text/70"> {problem.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
