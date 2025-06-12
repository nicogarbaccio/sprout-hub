import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PlantCatalog from "@/components/PlantCatalog";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { PWADebugPanel, usePWADebug } from "@/components/pwa/PWADebugPanel";
import { CascadingContainer } from "@/components/ui/cascading-container";
import { useGracefulLoading } from "@/hooks/useGracefulLoading";
import { Skeleton } from "@/components/ui/skeleton";

const MarketingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navigation />

      {/* Hero Section Skeleton */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            <div className="mb-8 lg:mb-0 lg:pt-8">
              <Skeleton className="h-16 w-3/4 mb-6" />
              <div className="space-y-2 mb-8">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
              <Skeleton className="h-12 w-40 rounded-xl" />
            </div>
            <div className="relative lg:flex lg:justify-center">
              <div className="bg-card rounded-3xl shadow-xl p-6 relative overflow-hidden mx-auto lg:mx-0 min-w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-plant-secondary/5 to-plant-primary/5 rounded-3xl"></div>
                <div className="relative">
                  <Skeleton className="w-full h-48 sm:h-56 lg:h-64 rounded-3xl mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-48 mb-1" />
                          <Skeleton className="h-3 w-36" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 h-full"
              >
                <Skeleton className="w-12 h-12 rounded-xl mb-6" />
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PlantCatalog Skeleton will be handled by the component itself */}
      <PlantCatalog isHomepage={true} />

      <Footer />
    </div>
  );
};

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { showDebugPanel } = usePWADebug();

  // Add loading state for marketing page initial load
  const [isMarketingLoading, setIsMarketingLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load time for marketing content
    if (!user && !authLoading) {
      const timer = setTimeout(() => setIsMarketingLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [user, authLoading]);

  const { showLoading: showMarketingLoading, isReady: isMarketingReady } =
    useGracefulLoading(isMarketingLoading, {
      minLoadingTime: 200,
      staggerDelay: 100,
    });

  // Show skeleton during auth loading or marketing loading for non-signed-in users
  if (authLoading || (!user && showMarketingLoading)) {
    return <MarketingPageSkeleton />;
  }

  // For non-signed-in users, show invisible placeholder during stagger delay
  if (!user && !isMarketingReady) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navigation />
        <div className="opacity-0">
          {/* Invisible content to maintain height */}
          <section className="bg-background py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                <div className="mb-8 lg:mb-0 lg:pt-8">
                  <div className="h-16 w-3/4 mb-6" />
                  <div className="h-24 mb-8" />
                  <div className="h-12 w-40" />
                </div>
                <div className="relative lg:flex lg:justify-center">
                  <div className="bg-card rounded-3xl shadow-xl p-6 relative overflow-hidden mx-auto lg:mx-0 min-w-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-plant-secondary/5 to-plant-primary/5 rounded-3xl"></div>
                    <div className="relative">
                      <div className="w-full h-48 sm:h-56 lg:h-64 rounded-3xl mb-4" />
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                              <div className="h-4 w-48 mb-1" />
                              <div className="h-3 w-36" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="h-10 w-80 mx-auto mb-4" />
                <div className="h-6 w-96 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-8 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl mb-6" />
                    <div className="h-6 w-32 mb-3" />
                    <div className="space-y-2">
                      <div className="h-4 w-full" />
                      <div className="h-4 w-full" />
                      <div className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="h-96" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navigation />

      {/* PWA Debug Panel - Development only */}
      {showDebugPanel && (
        <PWADebugPanel className="fixed top-20 right-4 w-80 z-40" />
      )}

      {user ? (
        // Dashboard view for signed-in users
        <Dashboard />
      ) : (
        // Marketing view for non-signed-in users with cascading animations
        <>
          <CascadingContainer delay={0}>
            <HeroSection />
          </CascadingContainer>

          <CascadingContainer delay={200}>
            <FeaturesSection />
          </CascadingContainer>

          <CascadingContainer delay={400}>
            <PlantCatalog isHomepage={true} />
          </CascadingContainer>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
