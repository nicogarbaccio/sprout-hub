
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
  },
  {
    name: 'English Ivy',
    botanicalName: 'Hedera helix',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants',
    description: 'A classic trailing plant with distinctive lobed leaves. English Ivy is perfect for hanging baskets and adds a touch of elegance to any space.',
    toxicity: 'Toxic to pets and children if ingested',
    temperature: '60-70°F (15-21°C)',
    humidity: '40-50%',
    careInstructions: [
      'Water when top inch of soil feels dry',
      'Provide bright, indirect light',
      'Pinch growing tips to encourage bushier growth',
      'Clean leaves regularly to remove dust',
      'Fertilize monthly during growing season'
    ],
    commonProblems: [
      'Spider mites: Increase humidity and check regularly',
      'Yellowing leaves: Usually from overwatering',
      'Leggy growth: Needs more light or pinching',
      'Brown leaf tips: Low humidity or fluoride in water'
    ]
  },
  {
    name: 'String of Hearts',
    botanicalName: 'Ceropegia woodii',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants',
    description: 'A charming succulent vine with heart-shaped leaves and distinctive silver markings. Perfect for hanging baskets with its delicate trailing habit.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-75°F (18-24°C)',
    humidity: '30-40%',
    careInstructions: [
      'Allow soil to dry between waterings',
      'Provide bright, indirect light for best coloration',
      'Propagate easily from stem cuttings',
      'Trim to maintain desired length',
      'Fertilize sparingly during growing season'
    ],
    commonProblems: [
      'Root rot: Ensure good drainage and don\'t overwater',
      'Pale leaves: Needs more light',
      'Sparse growth: May need more light or nutrients',
      'Shriveled leaves: Underwatering or low humidity'
    ]
  },
  {
    name: 'Tradescantia',
    botanicalName: 'Tradescantia zebrina',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Hanging & Trailing Plants',
    description: 'Also known as Wandering Jew, this fast-growing trailing plant features stunning purple and silver striped leaves that cascade beautifully.',
    toxicity: 'Mildly toxic to pets - may cause skin irritation',
    temperature: '65-75°F (18-24°C)',
    humidity: '40-50%',
    careInstructions: [
      'Keep soil consistently moist but not soggy',
      'Provide bright light for best coloration',
      'Pinch flowers to encourage foliage growth',
      'Propagate easily in water',
      'Trim regularly to maintain shape'
    ],
    commonProblems: [
      'Fading colors: Needs more bright light',
      'Leggy growth: Pinch regularly and provide adequate light',
      'Brown tips: Low humidity or fluoride sensitivity',
      'Dropping leaves: Usually from inconsistent watering'
    ]
  }
];
