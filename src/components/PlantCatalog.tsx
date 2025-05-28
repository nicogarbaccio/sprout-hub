
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PlantCard from './PlantCard';
import AddPlantDialog from './AddPlantDialog';

const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPlantData, setSelectedPlantData] = useState(null);
  const navigate = useNavigate();

  // Expanded plant data with many more varieties
  const plants = [
    {
      name: 'Peace Lily',
      botanicalName: 'Spathiphyllum wallisii',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Monstera Deliciosa',
      botanicalName: 'Monstera deliciosa',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Snake Plant',
      botanicalName: 'Sansevieria trifasciata',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Low Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Fiddle Leaf Fig',
      botanicalName: 'Ficus lyrata',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const
    },
    {
      name: 'Pothos',
      botanicalName: 'Epipremnum aureum',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Bright Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Rubber Plant',
      botanicalName: 'Ficus elastica',
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'ZZ Plant',
      botanicalName: 'Zamioculcas zamiifolia',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Boston Fern',
      botanicalName: 'Nephrolepis exaltata',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Twice weekly',
      suggestedWateringDays: 3,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Aloe Vera',
      botanicalName: 'Aloe barbadensis',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Philodendron',
      botanicalName: 'Philodendron hederaceum',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium to Bright Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Bird of Paradise',
      botanicalName: 'Strelitzia nicolai',
      image: 'https://images.unsplash.com/photo-1502911679107-2b54f5c0292c?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const
    },
    {
      name: 'Spider Plant',
      botanicalName: 'Chlorophytum comosum',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Jade Plant',
      botanicalName: 'Crassula ovata',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Dracaena',
      botanicalName: 'Dracaena marginata',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Chinese Money Plant',
      botanicalName: 'Pilea peperomioides',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Calathea',
      botanicalName: 'Calathea orbifolia',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Hard' as const
    },
    {
      name: 'English Ivy',
      botanicalName: 'Hedera helix',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Schefflera',
      botanicalName: 'Schefflera actinophylla',
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Croton',
      botanicalName: 'Codiaeum variegatum',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Majesty Palm',
      botanicalName: 'Ravenea rivularis',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Echeveria',
      botanicalName: 'Echeveria elegans',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Alocasia',
      botanicalName: 'Alocasia amazonica',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const
    },
    {
      name: 'Peperomia',
      botanicalName: 'Peperomia obtusifolia',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Norfolk Pine',
      botanicalName: 'Araucaria heterophylla',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Hoya',
      botanicalName: 'Hoya carnosa',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'String of Pearls',
      botanicalName: 'Senecio rowleyanus',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Monstera Adansonii',
      botanicalName: 'Monstera adansonii',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Dieffenbachia',
      botanicalName: 'Dieffenbachia seguine',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Anthurium',
      botanicalName: 'Anthurium andraeanum',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Yucca',
      botanicalName: 'Yucca elephantipes',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Ponytail Palm',
      botanicalName: 'Beaucarnea recurvata',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'African Violet',
      botanicalName: 'Saintpaulia ionantha',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const
    },
    {
      name: 'Prayer Plant',
      botanicalName: 'Maranta leuconeura',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Haworthia',
      botanicalName: 'Haworthia cooperi',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Christmas Cactus',
      botanicalName: 'Schlumbergera truncata',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Parlor Palm',
      botanicalName: 'Chamaedorea elegans',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const
    }
  ];

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (plantName: string) => {
    const plantPath = plantName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/plant-details/${plantPath}`);
  };

  const handleAddToCollection = (plant: any) => {
    setSelectedPlantData(plant);
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setSelectedPlantData(null);
  };

  return (
    <section className="py-20 bg-plant-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-plant-text mb-4 font-poppins">
            Discover Your Perfect Plants
          </h2>
          <p className="text-lg text-plant-text/70 max-w-2xl mx-auto font-poppins mb-8">
            Browse our extensive catalog of indoor plants with detailed care guides and growing tips.
          </p>
          
          <div className="max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-plant-text/40 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-plant-secondary/30 focus:border-plant-primary rounded-xl"
              />
            </div>
            <Button variant="outline" className="border-plant-secondary/30 hover:bg-plant-secondary/10 rounded-xl">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <PlantCard
              key={index}
              {...plant}
              onAddToCollection={() => handleAddToCollection(plant)}
              onViewDetails={() => handleViewDetails(plant.name)}
            />
          ))}
        </div>
        
        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-plant-text/60 text-lg">No plants found matching your search.</p>
          </div>
        )}

        <AddPlantDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
          plantData={selectedPlantData}
        />
      </div>
    </section>
  );
};

export default PlantCatalog;
