
import { Plant } from '../types';

export const tropicalPlants: Plant[] = [
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
  }
];
