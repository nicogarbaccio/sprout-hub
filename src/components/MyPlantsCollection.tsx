
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MyPlantCard from './MyPlantCard';

const MyPlantsCollection = () => {
  // Sample user plant collection
  const myPlants = [
    {
      id: '1',
      name: 'Charlie',
      plantType: 'Peace Lily',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
      lastWatered: 'Dec 20, 2024',
      nextWateringDue: 'Dec 27, 2024',
      isOverdue: false,
      daysUntilWatering: 3
    },
    {
      id: '2',
      name: 'Monsty',
      plantType: 'Monstera Deliciosa',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
      lastWatered: 'Dec 15, 2024',
      nextWateringDue: 'Dec 22, 2024',
      isOverdue: true,
      daysUntilWatering: -2
    },
    {
      id: '3',
      name: 'Sammy',
      plantType: 'Snake Plant',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      lastWatered: 'Nov 24, 2024',
      nextWateringDue: 'Dec 24, 2024',
      isOverdue: false,
      daysUntilWatering: 0
    }
  ];

  const overdueCount = myPlants.filter(plant => plant.isOverdue).length;
  const dueToday = myPlants.filter(plant => plant.daysUntilWatering === 0).length;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-plant-text mb-4 font-poppins">
              My Plant Collection
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-plant-secondary/20 text-plant-primary px-3 py-1 rounded-full">
                {myPlants.length} plants total
              </span>
              {overdueCount > 0 && (
                <span className="bg-plant-warning/20 text-plant-warning px-3 py-1 rounded-full">
                  {overdueCount} overdue
                </span>
              )}
              {dueToday > 0 && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {dueToday} due today
                </span>
              )}
            </div>
          </div>
          
          <Button className="bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Add New Plant
          </Button>
        </div>
        
        {myPlants.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-plant-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-plant-primary" />
            </div>
            <h3 className="text-xl font-semibold text-plant-text mb-2 font-poppins">Start Your Plant Journey</h3>
            <p className="text-plant-text/60 mb-6">Add your first plant to begin tracking its care and growth.</p>
            <Button className="bg-plant-primary hover:bg-plant-primary/90 text-white rounded-xl">
              Add Your First Plant
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myPlants.map((plant) => (
              <MyPlantCard
                key={plant.id}
                {...plant}
                onWater={() => console.log(`Watering ${plant.name}`)}
                onEdit={() => console.log(`Editing ${plant.name}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPlantsCollection;
