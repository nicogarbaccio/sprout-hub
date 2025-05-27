
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PlantCard from './PlantCard';

const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample plant data
  const plants = [
    {
      name: 'Peace Lily',
      botanicalName: 'Spathiphyllum wallisii',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      lightRequirement: 'Low to Medium Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Monstera Deliciosa',
      botanicalName: 'Monstera deliciosa',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      wateringFrequency: 'Bi-weekly',
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Medium' as const
    },
    {
      name: 'Snake Plant',
      botanicalName: 'Sansevieria trifasciata',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      wateringFrequency: 'Monthly',
      lightRequirement: 'Low Light',
      careLevel: 'Easy' as const
    },
    {
      name: 'Fiddle Leaf Fig',
      botanicalName: 'Ficus lyrata',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      wateringFrequency: 'Weekly',
      lightRequirement: 'Bright Indirect Light',
      careLevel: 'Hard' as const
    }
  ];

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              onAddToCollection={() => console.log(`Adding ${plant.name} to collection`)}
            />
          ))}
        </div>
        
        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-plant-text/60 text-lg">No plants found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantCatalog;
