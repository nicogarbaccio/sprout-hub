
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PlantCatalogHeader from './catalog/PlantCatalogHeader';
import PlantSearchFilters from './catalog/PlantSearchFilters';
import PlantResultsSummary from './catalog/PlantResultsSummary';
import PlantGrid from './catalog/PlantGrid';
import AddPlantDialog from './AddPlantDialog';
import { plants, getUniqueCategories, getUniqueCareLevels, getUniqueLightRequirements, Plant } from '@/data/plantData';

interface PlantCatalogProps {
  isHomepage?: boolean;
}

const PlantCatalog = ({ isHomepage = false }: PlantCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPlantData, setSelectedPlantData] = useState<Plant | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState('all');
  const [selectedLightRequirement, setSelectedLightRequirement] = useState('all');
  const navigate = useNavigate();

  // Get unique values for filter options
  const categories = getUniqueCategories();
  const careLevels = getUniqueCareLevels();
  const lightRequirements = getUniqueLightRequirements();

  // Filter plants based on all criteria
  let filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    const matchesCareLevel = selectedCareLevel === 'all' || plant.careLevel === selectedCareLevel;
    const matchesLight = selectedLightRequirement === 'all' || plant.lightRequirement === selectedLightRequirement;
    
    return matchesSearch && matchesCategory && matchesCareLevel && matchesLight;
  });

  // Limit plants on homepage to show only 4-5 rows (16-20 plants)
  const displayedPlants = isHomepage ? filteredPlants.slice(0, 16) : filteredPlants;

  const handleViewDetails = (plantName: string) => {
    const plantPath = plantName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/plant-details/${plantPath}`);
  };

  const handleAddToCollection = (plant: Plant) => {
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

  const handleViewAllPlants = () => {
    navigate('/plant-catalog');
  };

  return (
    <section className="py-20 bg-plant-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlantCatalogHeader />
        
        {!isHomepage && (
          <>
            <PlantSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCareLevel={selectedCareLevel}
              setSelectedCareLevel={setSelectedCareLevel}
              selectedLightRequirement={selectedLightRequirement}
              setSelectedLightRequirement={setSelectedLightRequirement}
              categories={categories}
              careLevels={careLevels}
              lightRequirements={lightRequirements}
              hasActiveFilters={hasActiveFilters}
              clearAllFilters={clearAllFilters}
            />

            <PlantResultsSummary
              filteredCount={filteredPlants.length}
              totalCount={plants.length}
              hasActiveFilters={hasActiveFilters}
            />
          </>
        )}
        
        <PlantGrid
          plants={displayedPlants}
          onAddToCollection={handleAddToCollection}
          onViewDetails={handleViewDetails}
          hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
        />

        {isHomepage && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={handleViewAllPlants}
              className="bg-plant-primary hover:bg-plant-primary/90 text-white px-8 py-3 rounded-xl font-medium text-lg"
            >
              View All Plants
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
