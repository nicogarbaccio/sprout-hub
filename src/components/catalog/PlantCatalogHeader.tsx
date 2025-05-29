const PlantCatalogHeader = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-plant-text mb-4 font-poppins">
        Find your next <span className="text-plant-primary">green</span>{" "}
        companion
      </h2>
      <p className="text-lg text-plant-text/70 max-w-2xl mx-auto font-poppins">
        Browse our extensive catalog of indoor plants with detailed care guides
        and growing tips.
      </p>
    </div>
  );
};

export default PlantCatalogHeader;
