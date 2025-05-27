
import Navigation from '@/components/Navigation';
import MyPlantsCollection from '@/components/MyPlantsCollection';

const MyPlants = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="pt-16">
        <MyPlantsCollection />
      </div>
    </div>
  );
};

export default MyPlants;
