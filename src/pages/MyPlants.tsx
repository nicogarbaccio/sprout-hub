import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import MyPlantsCollection from "@/components/MyPlantsCollection";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const MyPlants = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasShownToast.current) {
      hasShownToast.current = true;
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your plant collection.",
        variant: "default",
      });
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-poppins flex items-center justify-center">
        <div className="text-plant-text">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="pt-16">
        <MyPlantsCollection />
      </div>
      <Footer />
    </div>
  );
};

export default MyPlants;
