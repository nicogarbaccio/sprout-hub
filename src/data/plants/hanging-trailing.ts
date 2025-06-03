import { Plant } from '../types';

export const hangingTrailingPlants: Plant[] = [
  {
    name: 'Pothos',
    botanicalName: 'Epipremnum aureum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539513/golden-pothos-potted-plant__0653982_pe708211_s5_kvzksn.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants'
  },
  {
    name: 'Spider Plant',
    botanicalName: 'Chlorophytum comosum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539539/1000x_wglhkv.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants'
  }
];
