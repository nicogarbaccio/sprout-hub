
import { Plant } from '../types';

export const tropicalPlants: Plant[] = [
  {
    name: 'Monstera Deliciosa',
    botanicalName: 'Monstera deliciosa',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748540196/united-nursery-monstera-plants-21887-64_600_qccheq.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Bird of Paradise',
    botanicalName: 'Strelitzia nicolai',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748540227/multi-planted-bird-of-paradise-strelitzia-nicolai-25cm-pot-my-jungle-home-142052_tycvp3.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Alocasia',
    botanicalName: 'Alocasia amazonica',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748540250/alocasia-amazonica-potted-plant-elephant-ear__0653981_pe708210_s5_n3zpxt.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Monstera Adansonii',
    botanicalName: 'Monstera adansonii',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748540275/Monstera_Adansonii_Swiss_Cheese_Plant_btuaki.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Tropical Plants'
  },
  {
    name: 'Dieffenbachia',
    botanicalName: 'Dieffenbachia seguine',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748540302/DG5_1024px_anuzkc.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Tropical Plants'
  }
];
