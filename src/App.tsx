import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileDataProvider } from "@/contexts/ProfileDataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PlantCatalogPage from "./pages/PlantCatalog";
import PlantDetails from "./pages/PlantDetails";
import MyPlants from "./pages/MyPlants";
import Profile from "./pages/Profile";
import SkeletonDemo from "./pages/SkeletonDemo";
import ToastDemo from "./components/ToastDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="sprouthub-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ProfileDataProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/plant-catalog" element={<PlantCatalogPage />} />
                <Route
                  path="/plant-details/:plantName"
                  element={<PlantDetails />}
                />
                <Route path="/my-plants" element={<MyPlants />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/skeleton-demo" element={<SkeletonDemo />} />
                <Route path="/toast-demo" element={<ToastDemo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProfileDataProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
