import Navigation from "@/components/Navigation";
import PlantCatalog from "@/components/PlantCatalog";
import Footer from "@/components/Footer";

const PlantCatalogPage = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <PlantCatalog />
      <Footer />
    </div>
  );
};

export default PlantCatalogPage;
