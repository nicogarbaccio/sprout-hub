
import { Plant } from '../types';

export const airPlants: Plant[] = [
  {
    name: 'Tillandsia Ionantha',
    botanicalName: 'Tillandsia ionantha',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Air Plants',
    description: 'A compact air plant that turns pink/red when blooming. Perfect for terrariums, hanging displays, or mounted arrangements.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-80°F (18-27°C)',
    humidity: '50-60%',
    careInstructions: [
      'Soak in water for 20-30 minutes weekly',
      'Shake off excess water and air dry completely',
      'Provide bright, indirect light',
      'Ensure good air circulation',
      'Mist between waterings in dry climates'
    ],
    commonProblems: [
      'Rotting: Usually from not drying completely after watering',
      'Shriveling: Needs more frequent watering or humidity',
      'Brown tips: Low humidity or over-fertilizing',
      'No blooming: Needs more bright light'
    ]
  },
  {
    name: 'Spanish Moss',
    botanicalName: 'Tillandsia usneoides',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Twice weekly',
    suggestedWateringDays: 3,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Air Plants',
    description: 'Dramatic trailing air plant that creates beautiful cascading displays. Often used in hanging arrangements and terrariums.',
    toxicity: 'Non-toxic to pets',
    temperature: '60-80°F (15-27°C)',
    humidity: '60-70%',
    careInstructions: [
      'Mist thoroughly 2-3 times per week',
      'Occasionally soak in water for 10-15 minutes',
      'Ensure excellent air circulation',
      'Provide bright, filtered light',
      'Gently shake to remove excess water'
    ],
    commonProblems: [
      'Rotting sections: Poor air circulation or staying wet too long',
      'Drying out: Needs more frequent misting',
      'Pests: Check for spider mites in dry conditions',
      'Breaking apart: Natural growth pattern, not a problem'
    ]
  },
  {
    name: 'Tillandsia Xerographica',
    botanicalName: 'Tillandsia xerographica',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Air Plants',
    description: 'Known as the "Queen of Air Plants," this large, silvery air plant forms a stunning rosette and is very drought tolerant.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-80°F (18-27°C)',
    humidity: '40-60%',
    careInstructions: [
      'Soak for 1-2 hours every 10-14 days',
      'Turn upside down to dry completely',
      'Provide bright, indirect light',
      'Avoid getting water trapped in center',
      'Very drought tolerant once established'
    ],
    commonProblems: [
      'Center rot: Water trapped in the rosette',
      'Dry, brittle leaves: Needs more humidity or watering',
      'Slow growth: Normal for this species',
      'Brown tips: Usually from low humidity'
    ]
  }
];
