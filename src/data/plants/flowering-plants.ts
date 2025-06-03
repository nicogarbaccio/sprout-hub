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
  }
];
