
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PlantCatalog from '@/components/PlantCatalog';
import MyPlantsCollection from '@/components/MyPlantsCollection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PlantCatalog />
      <MyPlantsCollection />
      
      {/* Footer */}
      <footer className="bg-plant-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 font-poppins">PlantPal</h3>
            <p className="text-plant-secondary mb-6">Your personal plant care assistant</p>
            <p className="text-sm text-plant-secondary/80">
              © 2024 PlantPal. Made with ♥ for plant lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
