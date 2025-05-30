import { Button } from "@/components/ui/button";
import { PlantCardSkeleton } from "@/components/ui/skeleton";
import PlantCard from "../PlantCard";
import { Plant } from "@/data/plantData";

interface PlantGridProps {
  plants: Plant[];
  onAddToCollection: (plant: Plant) => void;
  onViewDetails: (plantName: string) => void;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  isLoading?: boolean;
}

const PlantGrid = ({
  plants,
  onAddToCollection,
  onViewDetails,
  hasActiveFilters,
  clearAllFilters,
  isLoading = false,
}: PlantGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <PlantCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-plant-text/60 text-lg mb-4">
          No plants found matching your criteria.
        </p>
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plants.map((plant, index) => (
        <PlantCard
          key={index}
          {...plant}
          onAddToCollection={() => onAddToCollection(plant)}
          onViewDetails={() => onViewDetails(plant.name)}
        />
      ))}
    </div>
  );
};

export default PlantGrid;
