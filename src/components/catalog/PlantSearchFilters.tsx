
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PlantSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCareLevel: string;
  setSelectedCareLevel: (level: string) => void;
  selectedLightRequirement: string;
  setSelectedLightRequirement: (light: string) => void;
  categories: string[];
  careLevels: string[];
  lightRequirements: string[];
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
}

const PlantSearchFilters = ({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  selectedCategory,
  setSelectedCategory,
  selectedCareLevel,
  setSelectedCareLevel,
  selectedLightRequirement,
  setSelectedLightRequirement,
  categories,
  careLevels,
  lightRequirements,
  hasActiveFilters,
  clearAllFilters
}: PlantSearchFiltersProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mb-8">
      {/* Search Bar - Centered */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-plant-text/40 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-plant-secondary/30 focus:border-plant-primary rounded-xl h-11"
          />
        </div>
      </div>

      {/* Filter Toggle - Centered */}
      <div className="flex justify-center">
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="border-plant-secondary/30 hover:bg-plant-secondary/10 rounded-xl h-11 px-6"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 bg-plant-primary text-white text-xs">
                  Active
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
          
          {/* Filters Panel - Appears Below */}
          <CollapsibleContent className="mt-6 w-full">
            <div className="p-6 bg-white rounded-xl border border-plant-secondary/30 shadow-lg">
              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-plant-text block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-plant-secondary/30 w-full h-11">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg z-50 max-h-60">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-plant-text block">Care Level</label>
                  <Select value={selectedCareLevel} onValueChange={setSelectedCareLevel}>
                    <SelectTrigger className="border-plant-secondary/30 w-full h-11">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg z-50 max-h-60">
                      <SelectItem value="all">All Levels</SelectItem>
                      {careLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-plant-text block">Light Requirement</label>
                  <Select value={selectedLightRequirement} onValueChange={setSelectedLightRequirement}>
                    <SelectTrigger className="border-plant-secondary/30 w-full h-11">
                      <SelectValue placeholder="All Light Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-plant-secondary/30 shadow-lg z-50 max-h-60">
                      <SelectItem value="all">All Light Types</SelectItem>
                      {lightRequirements.map(light => (
                        <SelectItem key={light} value={light}>{light}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="mt-6 pt-4 border-t border-plant-secondary/20 flex justify-center">
                  <Button 
                    variant="ghost" 
                    onClick={clearAllFilters}
                    className="text-plant-text/70 hover:text-plant-text hover:bg-plant-secondary/10 px-4 py-2"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default PlantSearchFilters;
