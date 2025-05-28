
export interface Plant {
  name: string;
  botanicalName: string;
  image: string;
  wateringFrequency: string;
  suggestedWateringDays: number;
  lightRequirement: string;
  careLevel: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description?: string;
  toxicity?: string;
  temperature?: string;
  humidity?: string;
  careInstructions?: string[];
  commonProblems?: string[];
}

export const plants: Plant[] = [
  {
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum wallisii',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Snake Plant',
    botanicalName: 'Sansevieria trifasciata',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Low Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus lyrata',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'Pothos',
    botanicalName: 'Epipremnum aureum',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Low to Bright Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'Rubber Plant',
    botanicalName: 'Ficus elastica',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'ZZ Plant',
    botanicalName: 'Zamioculcas zamiifolia',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Low Maintenance'
  },
  {
    name: 'Boston Fern',
    botanicalName: 'Nephrolepis exaltata',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    wateringFrequency: 'Twice weekly',
    suggestedWateringDays: 3,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Ferns'
  },
  {
    name: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Philodendron',
    botanicalName: 'Philodendron hederaceum',
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium to Bright Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'Bird of Paradise',
    botanicalName: 'Strelitzia nicolai',
    image: 'https://images.unsplash.com/photo-1502911679107-2b54f5c0292c?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Spider Plant',
    botanicalName: 'Chlorophytum comosum',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'Jade Plant',
    botanicalName: 'Crassula ovata',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Dracaena',
    botanicalName: 'Dracaena marginata',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'Chinese Money Plant',
    botanicalName: 'Pilea peperomioides',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Small Plants'
  },
  {
    name: 'Calathea',
    botanicalName: 'Calathea orbifolia',
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Hard' as const,
    category: 'Prayer Plants'
  },
  {
    name: 'English Ivy',
    botanicalName: 'Hedera helix',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'Schefflera',
    botanicalName: 'Schefflera actinophylla',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'Croton',
    botanicalName: 'Codiaeum variegatum',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Medium' as const,
    category: 'Colorful Foliage'
  },
  {
    name: 'Majesty Palm',
    botanicalName: 'Ravenea rivularis',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Palms'
  },
  {
    name: 'Echeveria',
    botanicalName: 'Echeveria elegans',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Alocasia',
    botanicalName: 'Alocasia amazonica',
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Peperomia',
    botanicalName: 'Peperomia obtusifolia',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Small Plants'
  },
  {
    name: 'Norfolk Pine',
    botanicalName: 'Araucaria heterophylla',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'Hoya',
    botanicalName: 'Hoya carnosa',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'String of Pearls',
    botanicalName: 'Senecio rowleyanus',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Succulents'
  },
  {
    name: 'Monstera Adansonii',
    botanicalName: 'Monstera adansonii',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Dieffenbachia',
    botanicalName: 'Dieffenbachia seguine',
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Anthurium',
    botanicalName: 'Anthurium andraeanum',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Yucca',
    botanicalName: 'Yucca elephantipes',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Trees & Large Plants'
  },
  {
    name: 'Ponytail Palm',
    botanicalName: 'Beaucarnea recurvata',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Palms'
  },
  {
    name: 'African Violet',
    botanicalName: 'Saintpaulia ionantha',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Prayer Plant',
    botanicalName: 'Maranta leuconeura',
    image: 'https://images.unsplash.com/photo-1594736797933-d0cc5d8b7ac0?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Medium' as const,
    category: 'Prayer Plants'
  },
  {
    name: 'Haworthia',
    botanicalName: 'Haworthia cooperi',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Christmas Cactus',
    botanicalName: 'Schlumbergera truncata',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Parlor Palm',
    botanicalName: 'Chamaedorea elegans',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Palms'
  }
];

export const getUniqueCategories = () => {
  return Array.from(new Set(plants.map(plant => plant.category))).sort();
};

export const getUniqueCareLevels = () => {
  return Array.from(new Set(plants.map(plant => plant.careLevel))).sort();
};

export const getUniqueLightRequirements = () => {
  return Array.from(new Set(plants.map(plant => plant.lightRequirement))).sort();
};
