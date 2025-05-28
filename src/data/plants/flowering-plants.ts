
import { Plant } from '../types';

export const floweringPlants: Plant[] = [
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
    name: 'Christmas Cactus',
    botanicalName: 'Schlumbergera truncata',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Flowering Plants'
  }
];
