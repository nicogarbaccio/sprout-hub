
import { Plant } from '../types';

export const otherPlants: Plant[] = [
  {
    name: 'ZZ Plant',
    botanicalName: 'Zamioculcas zamiifolia',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539586/8D2A2069_cgjmbk.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Low Maintenance'
  },
  {
    name: 'Boston Fern',
    botanicalName: 'Nephrolepis exaltata',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539605/Boston_Fern_Plant_lbfkir.jpg',
    wateringFrequency: 'Twice weekly',
    suggestedWateringDays: 3,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Ferns'
  },
  {
    name: 'Chinese Money Plant',
    botanicalName: 'Pilea peperomioides',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539634/Chinese-Money-Pilea_bsau0h.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Small Plants'
  },
  {
    name: 'Calathea',
    botanicalName: 'Calathea orbifolia',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539678/calathea-orbifolia_tqhnjf.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Hard' as const,
    category: 'Prayer Plants'
  },
  {
    name: 'Croton',
    botanicalName: 'Codiaeum variegatum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539699/croton-plant-basket-codiaeum-variegatum-pictum-PL01301.425_pqloj9.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Medium' as const,
    category: 'Colorful Foliage'
  },
  {
    name: 'Majesty Palm',
    botanicalName: 'Ravenea rivularis',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539722/E3403-1024-1024-01_gh81yo.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Palms'
  },
  {
    name: 'Peperomia',
    botanicalName: 'Peperomia obtusifolia',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539777/peperomia_obtusifolia_gzuoij.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Small Plants'
  },
  {
    name: 'Ponytail Palm',
    botanicalName: 'Beaucarnea recurvata',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539801/DSC03549-Edit--cream_jbjnkp.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Palms'
  },
  {
    name: 'Prayer Plant',
    botanicalName: 'Maranta leuconeura',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539824/Prayer-Plant-1200x1200_dqdk8y.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Medium' as const,
    category: 'Prayer Plants'
  },
  {
    name: 'Parlor Palm',
    botanicalName: 'Chamaedorea elegans',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539843/house-plants-4-palm-parlor-64_1000_lcgd3u.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Low to Medium Light',
    careLevel: 'Easy' as const,
    category: 'Palms'
  },
  {
    name: 'Maidenhair Fern',
    botanicalName: 'Adiantum raddianum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Twice weekly',
    suggestedWateringDays: 3,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Hard' as const,
    category: 'Ferns',
    description: 'Delicate and graceful fern with fine, lacy fronds. Known for being finicky but absolutely stunning when properly cared for.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-75°F (18-24°C)',
    humidity: '60-80%',
    careInstructions: [
      'Keep soil consistently moist but not soggy',
      'Provide high humidity with pebble tray or humidifier',
      'Avoid direct sunlight',
      'Use distilled or rainwater if possible',
      'Mist regularly but avoid getting water on fronds'
    ],
    commonProblems: [
      'Brown, crispy fronds: Low humidity or dry air',
      'Yellowing fronds: Natural aging or overwatering',
      'Dropping leaflets: Shock from environmental changes',
      'Slow growth: Needs more humidity or filtered light'
    ]
  },
  {
    name: 'Staghorn Fern',
    botanicalName: 'Platycerium bifurcatum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Ferns',
    description: 'An epiphytic fern with distinctive antler-shaped fronds. Often mounted on wood or grown in hanging baskets for dramatic effect.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-80°F (18-27°C)',
    humidity: '50-70%',
    careInstructions: [
      'Soak weekly by submerging the entire mount',
      'Provide bright, indirect light',
      'Ensure good air circulation',
      'Don\'t remove brown shield fronds',
      'Fertilize monthly with diluted liquid fertilizer'
    ],
    commonProblems: [
      'Brown frond tips: Low humidity or over-fertilizing',
      'Yellowing fronds: Usually overwatering',
      'Pests: Watch for scale insects',
      'Slow growth: May need more light or nutrients'
    ]
  },
  {
    name: 'Bird\'s Nest Fern',
    botanicalName: 'Asplenium nidus',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Medium Light',
    careLevel: 'Easy' as const,
    category: 'Ferns',
    description: 'A tropical fern with broad, glossy fronds that emerge from a central crown, resembling a bird\'s nest. Perfect for bathrooms.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-80°F (18-27°C)',
    humidity: '50-60%',
    careInstructions: [
      'Water around the base, avoid the center crown',
      'Keep soil consistently moist',
      'Provide filtered or indirect light',
      'Clean leaves with damp cloth occasionally',
      'Don\'t touch or handle new fronds'
    ],
    commonProblems: [
      'Brown leaf tips: Low humidity or fluoride in water',
      'Yellowing fronds: Natural aging or overwatering',
      'Crown rot: Avoid watering into the center',
      'Torn fronds: Handle carefully, new growth is delicate'
    ]
  },
  {
    name: 'Coleus',
    botanicalName: 'Solenostemon scutellarioides',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 5,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Colorful Foliage',
    description: 'Vibrant foliage plant with incredible color combinations. Coleus comes in countless varieties with unique leaf patterns and colors.',
    toxicity: 'Mildly toxic to pets',
    temperature: '65-75°F (18-24°C)',
    humidity: '40-50%',
    careInstructions: [
      'Keep soil consistently moist',
      'Pinch flower spikes to maintain foliage',
      'Provide bright, indirect light for best colors',
      'Pinch growing tips to encourage bushiness',
      'Easy to propagate from cuttings'
    ],
    commonProblems: [
      'Fading colors: Usually needs more light',
      'Leggy growth: Pinch regularly and provide adequate light',
      'Wilting: Usually needs more water or humidity',
      'Flower spikes: Pinch to redirect energy to foliage'
    ]
  },
  {
    name: 'Caladium',
    botanicalName: 'Caladium bicolor',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 7,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Colorful Foliage',
    description: 'Stunning tropical plant with heart-shaped leaves in brilliant colors. Caladiums are perfect for adding dramatic color to indoor spaces.',
    toxicity: 'Toxic to pets and children if ingested',
    temperature: '70-80°F (21-27°C)',
    humidity: '50-60%',
    careInstructions: [
      'Keep soil consistently moist during growing season',
      'Provide bright, filtered light',
      'Maintain high humidity',
      'Allow dormancy in winter',
      'Store tubers in warm, dry place during dormancy'
    ],
    commonProblems: [
      'Leaf drop: Natural in fall/winter or too cold',
      'Fading colors: Needs brighter indirect light',
      'Brown leaf edges: Low humidity or fluoride sensitivity',
      'Dormancy: Natural cycle, reduce watering'
    ]
  }
];
