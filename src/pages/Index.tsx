import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlantCatalog from "@/components/PlantCatalog";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { PWADebugPanel, usePWADebug } from "@/components/pwa/PWADebugPanel";

const Index = () => {
  const { user } = useAuth();
  const { showDebugPanel } = usePWADebug();

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />

      {/* PWA Debug Panel - Development only */}
      {showDebugPanel && (
        <PWADebugPanel className="fixed top-20 right-4 w-80 z-40" />
      )}

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
