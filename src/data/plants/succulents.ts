
import { Plant } from '../types';

export const succulents: Plant[] = [
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
    name: 'Haworthia',
    botanicalName: 'Haworthia cooperi',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=300&fit=crop',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  }
];
