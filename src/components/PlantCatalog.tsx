import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PlantCard from './PlantCard';
import AddPlantDialog from './AddPlantDialog';

const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPlantData, setSelectedPlantData] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState('all');
  const [selectedLightRequirement, setSelectedLightRequirement] = useState('all');
  const navigate = useNavigate();

  // Plant data with categories
  const plants = [
    {
      name: 'Peace Lily',
      botanicalName: 'Spathiphyllum wallisii',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const,
      category: 'Flowering Plants'
    },
    {
      name: 'Monstera Deliciosa',
      botanicalName: 'Monstera deliciosa',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Tropical Plants'
    },
    {
      name: 'Snake Plant',
      botanicalName: 'Sansevieria trifasciata',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Low Light',
      careLevel: 'Easy' as const,
      category: 'Succulents'
    },
    {
      name: 'Fiddle Leaf Fig',
      botanicalName: 'Ficus lyrata',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'Pothos',
      botanicalName: 'Epipremnum aureum',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Bright Light',
      careLevel: 'Easy' as const,
      category: 'Hanging & Trailing Plants'
    },
    {
      name: 'Rubber Plant',
      botanicalName: 'Ficus elastica',
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'ZZ Plant',
      botanicalName: 'Zamioculcas zamiifolia',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const,
      category: 'Low Maintenance'
    },
    {
      name: 'Boston Fern',
      botanicalName: 'Nephrolepis exaltata',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Twice weekly',
      suggestedWateringDays: 3,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Ferns'
    },
    {
      name: 'Aloe Vera',
      botanicalName: 'Aloe barbadensis',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const,
      category: 'Succulents'
    },
    {
      name: 'Philodendron',
      botanicalName: 'Philodendron hederaceum',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium to Bright Light',
      careLevel: 'Easy' as const,
      category: 'Hanging & Trailing Plants'
    },
    {
      name: 'Bird of Paradise',
      botanicalName: 'Strelitzia nicolai',
      image: 'https://images.unsplash.com/photo-1502911679107-2b54f5c0292c?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const,
      category: 'Tropical Plants'
    },
    {
      name: 'Spider Plant',
      botanicalName: 'Chlorophytum comosum',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const,
      category: 'Hanging & Trailing Plants'
    },
    {
      name: 'Jade Plant',
      botanicalName: 'Crassula ovata',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const,
      category: 'Succulents'
    },
    {
      name: 'Dracaena',
      botanicalName: 'Dracaena marginata',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'Chinese Money Plant',
      botanicalName: 'Pilea peperomioides',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const,
      category: 'Small Plants'
    },
    {
      name: 'Calathea',
      botanicalName: 'Calathea orbifolia',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Hard' as const,
      category: 'Prayer Plants'
    },
    {
      name: 'English Ivy',
      botanicalName: 'Hedera helix',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Hanging & Trailing Plants'
    },
    {
      name: 'Schefflera',
      botanicalName: 'Schefflera actinophylla',
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'Croton',
      botanicalName: 'Codiaeum variegatum',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Medium' as const,
      category: 'Colorful Foliage'
    },
    {
      name: 'Majesty Palm',
      botanicalName: 'Ravenea rivularis',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Palms'
    },
    {
      name: 'Echeveria',
      botanicalName: 'Echeveria elegans',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const,
      category: 'Succulents'
    },
    {
      name: 'Alocasia',
      botanicalName: 'Alocasia amazonica',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const,
      category: 'Tropical Plants'
    },
    {
      name: 'Peperomia',
      botanicalName: 'Peperomia obtusifolia',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const,
      category: 'Small Plants'
    },
    {
      name: 'Norfolk Pine',
      botanicalName: 'Araucaria heterophylla',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'Hoya',
      botanicalName: 'Hoya carnosa',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Hanging & Trailing Plants'
    },
    {
      name: 'String of Pearls',
      botanicalName: 'Senecio rowleyanus',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Succulents'
    },
    {
      name: 'Monstera Adansonii',
      botanicalName: 'Monstera adansonii',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Tropical Plants'
    },
    {
      name: 'Dieffenbachia',
      botanicalName: 'Dieffenbachia seguine',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Easy' as const,
      category: 'Tropical Plants'
    },
    {
      name: 'Anthurium',
      botanicalName: 'Anthurium andraeanum',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const,
      category: 'Flowering Plants'
    },
    {
      name: 'Yucca',
      botanicalName: 'Yucca elephantipes',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const,
      category: 'Trees & Large Plants'
    },
    {
      name: 'Ponytail Palm',
      botanicalName: 'Beaucarnea recurvata',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      suggestedWateringDays: 30,
      lightRequirement: 'Bright Direct Light',
      careLevel: 'Easy' as const,
      category: 'Palms'
    },
    {
      name: 'African Violet',
      botanicalName: 'Saintpaulia ionantha',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const,
      category: 'Flowering Plants'
    },
    {
      name: 'Prayer Plant',
      botanicalName: 'Maranta leuconeura',
      image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Medium Light',
      careLevel: 'Medium' as const,
      category: 'Prayer Plants'
    },
    {
      name: 'Haworthia',
      botanicalName: 'Haworthia cooperi',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      suggestedWateringDays: 14,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const,
      category: 'Succulents'
    },
    {
      name: 'Christmas Cactus',
      botanicalName: 'Schlumbergera truncata',
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 10,
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Easy' as const,
      category: 'Flowering Plants'
    },
    {
      name: 'Parlor Palm',
      botanicalName: 'Chamaedorea elegans',
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      suggestedWateringDays: 7,
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const,
      category: 'Palms'
    }
  ];

  // Get unique values for filter options
  const categories = Array.from(new Set(plants.map(plant => plant.category))).sort();
  const careLevels = Array.from(new Set(plants.map(plant => plant.careLevel))).sort();
  const lightRequirements = Array.from(new Set(plants.map(plant => plant.lightRequirement))).sort();

  // Filter plants based on all criteria
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    const matchesCareLevel = selectedCareLevel === 'all' || plant.careLevel === selectedCareLevel;
    const matchesLight = selectedLightRequirement === 'all' || plant.lightRequirement === selectedLightRequirement;
    
    return matchesSearch && matchesCategory && matchesCareLevel && matchesLight;
  });

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

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCareLevel('all');
    setSelectedLightRequirement('all');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedCareLevel !== 'all' || selectedLightRequirement !== 'all' || searchTerm !== '';

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
          
          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-2">
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
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="border-plant-secondary/30 hover:bg-plant-secondary/10 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2 bg-plant-primary text-white">
                        Active
                      </Badge>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-plant-secondary/30">
                    <div>
                      <label className="text-sm font-medium text-plant-text mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="border-plant-secondary/30">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg">
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-plant-text mb-2 block">Care Level</label>
                      <Select value={selectedCareLevel} onValueChange={setSelectedCareLevel}>
                        <SelectTrigger className="border-plant-secondary/30">
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg">
                          <SelectItem value="all">All Levels</SelectItem>
                          {careLevels.map(level => (
                            <SelectItem key={level} value={level}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-plant-text mb-2 block">Light Requirement</label>
                      <Select value={selectedLightRequirement} onValueChange={setSelectedLightRequirement}>
                        <SelectTrigger className="border-plant-secondary/30">
                          <SelectValue placeholder="All Light Types" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg">
                          <SelectItem value="all">All Light Types</SelectItem>
                          {lightRequirements.map(light => (
                            <SelectItem key={light} value={light}>{light}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {hasActiveFilters && (
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="ghost" 
                        onClick={clearAllFilters}
                        className="text-plant-text/70 hover:text-plant-text"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-plant-text/70">
            Showing {filteredPlants.length} of {plants.length} plants
            {hasActiveFilters && (
              <span className="ml-2">
                <Badge variant="outline" className="border-plant-secondary/30">
                  Filtered
                </Badge>
              </span>
            )}
          </p>
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
            <p className="text-plant-text/60 text-lg mb-4">No plants found matching your criteria.</p>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="border-plant-secondary/30 hover:bg-plant-secondary/10"
              >
                Clear All Filters
              </Button>
            )}
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
