import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlantCatalog from "@/components/PlantCatalog";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />

      {user ? (
        // Dashboard view for signed-in users
        <>
          <Dashboard />
          {/* Optional: Show a condensed plant catalog or skip it for dashboard users */}
          <PlantCatalog isHomepage={true} isDashboard={true} />
        </>
      ) : (
        // Marketing view for non-signed-in users
        <>
          <HeroSection />
          <FeaturesSection />
          <PlantCatalog isHomepage={true} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
