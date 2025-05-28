
import { Plant } from '../types';

export const treesLargePlants: Plant[] = [
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
    name: 'Norfolk Pine',
    botanicalName: 'Araucaria heterophylla',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Trees & Large Plants'
  }
];
