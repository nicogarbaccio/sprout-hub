
import { Badge } from '@/components/ui/badge';

interface PlantResultsSummaryProps {
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
}

const PlantResultsSummary = ({ filteredCount, totalCount, hasActiveFilters }: PlantResultsSummaryProps) => {
  return (
    <div className="mb-6 text-center">
      <p className="text-plant-text/70">
        Showing {filteredCount} of {totalCount} plants
        {hasActiveFilters && (
          <span className="ml-2">
            <Badge variant="outline" className="border-plant-secondary/30">
              Filtered
            </Badge>
          </span>
        )}
      </p>
    </div>
  );
};

export default PlantResultsSummary;
