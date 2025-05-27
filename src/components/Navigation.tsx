
import { Search, Droplets, Home, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-plant-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-plant-primary rounded-full flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-plant-primary font-poppins">PlantPal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Plant Catalog</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>My Plants</span>
            </Button>
            <Button variant="ghost" className="text-plant-text hover:text-plant-primary">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
