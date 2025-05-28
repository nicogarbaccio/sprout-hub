import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlantCatalog from "@/components/PlantCatalog";
import MyPlantsCollection from "@/components/MyPlantsCollection";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PlantCatalog isHomepage={true} />
      {user && <MyPlantsCollection />}
      <Footer />
    </div>
  );
};

export default Index;
