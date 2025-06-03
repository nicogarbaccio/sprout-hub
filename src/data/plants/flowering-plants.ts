
import { Plant } from '../types';

export const floweringPlants: Plant[] = [
  {
    name: 'Peace Lily',
    botanicalName: 'Spathiphyllum wallisii',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539320/peace-lily_u9evw6.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Anthurium',
    botanicalName: 'Anthurium andraeanum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539375/the-sill_Pink-Anthurium_Variant2_sczrul.png',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'African Violet',
    botanicalName: 'Saintpaulia ionantha',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539398/How-Big-Do-African-Violets-Get1-1024x1024_rtb8sy.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Christmas Cactus',
    botanicalName: 'Schlumbergera truncata',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539415/christmas-cactus_otrkjn.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants'
  },
  {
    name: 'Begonia',
    botanicalName: 'Begonia rex',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Flowering Plants',
    description: 'Rex Begonias are prized for their stunning colorful foliage and occasional small flowers. Their leaves display incredible patterns and colors.',
    toxicity: 'Mildly toxic to pets if ingested',
    temperature: '65-75°F (18-24°C)',
    humidity: '50-60%',
    careInstructions: [
      'Keep soil consistently moist but well-draining',
      'Provide bright, indirect light',
      'Maintain high humidity around the plant',
      'Avoid getting water on leaves',
      'Fertilize monthly during growing season'
    ],
    commonProblems: [
      'Powdery mildew: Improve air circulation and avoid wet leaves',
      'Brown leaf edges: Low humidity or fluoride sensitivity',
      'Leaf drop: Usually from temperature fluctuations',
      'Fading colors: Needs brighter indirect light'
    ]
  },
  {
    name: 'Cyclamen',
    botanicalName: 'Cyclamen persicum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Twice weekly',
    suggestedWateringDays: 3,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Flowering Plants',
    description: 'Beautiful flowering plant with upswept petals and heart-shaped leaves. Cyclamen bloom in cooler months with proper care.',
    toxicity: 'Toxic to pets and children if ingested',
    temperature: '50-65°F (10-18°C)',
    humidity: '50-60%',
    careInstructions: [
      'Water from bottom to avoid wetting the crown',
      'Keep in cool, bright location',
      'Remove spent flowers and yellowing leaves',
      'Allow dormancy period in summer',
      'Resume watering when new growth appears'
    ],
    commonProblems: [
      'Crown rot: Avoid watering the center of the plant',
      'Yellowing leaves: Natural dormancy or overwatering',
      'Short bloom period: Needs cool temperatures',
      'Wilting flowers: Too warm or needs water'
    ]
  },
  {
    name: 'Geranium',
    botanicalName: 'Pelargonium x hortorum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants',
    description: 'Classic flowering houseplant with vibrant blooms and distinctive scented foliage. Geraniums are reliable bloomers with proper care.',
    toxicity: 'Mildly toxic to pets',
    temperature: '65-70°F (18-21°C)',
    humidity: '30-40%',
    careInstructions: [
      'Water thoroughly when soil surface is dry',
      'Provide at least 4-6 hours of direct sunlight',
      'Deadhead spent flowers regularly',
      'Pinch growing tips to encourage bushiness',
      'Fertilize every 2-3 weeks during blooming season'
    ],
    commonProblems: [
      'Lack of flowers: Usually insufficient light',
      'Yellowing leaves: Overwatering or natural aging',
      'Leggy growth: Needs more light and pinching',
      'Leaf spots: Avoid overhead watering'
    ]
  }
];
