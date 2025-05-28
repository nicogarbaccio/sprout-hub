
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantCatalogHeader from './catalog/PlantCatalogHeader';
import PlantSearchFilters from './catalog/PlantSearchFilters';
import PlantResultsSummary from './catalog/PlantResultsSummary';
import PlantGrid from './catalog/PlantGrid';
import AddPlantDialog from './AddPlantDialog';
import { plants, getUniqueCategories, getUniqueCareLevels, getUniqueLightRequirements, Plant } from '@/data/plantData';

const PlantCatalog = () => {
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

  return (
    <section className="py-20 bg-plant-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PlantCatalogHeader />
        
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
        
        <PlantGrid
          plants={filteredPlants}
          onAddToCollection={handleAddToCollection}
          onViewDetails={handleViewDetails}
          hasActiveFilters={hasActiveFilters}
          clearAllFilters={clearAllFilters}
        />

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
