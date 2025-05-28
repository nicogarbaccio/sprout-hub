
interface PlantImageSectionProps {
  image: string;
  name: string;
}

const PlantImageSection = ({ image, name }: PlantImageSectionProps) => {
  return (
    <div>
      <img 
        src={image} 
        alt={name}
        className="w-full h-96 object-cover rounded-2xl shadow-lg"
      />
    </div>
  );
};

export default PlantImageSection;
