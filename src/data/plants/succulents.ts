
import { Plant } from '../types';

export const succulents: Plant[] = [
  {
    name: 'Snake Plant',
    botanicalName: 'Sansevieria trifasciata',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539871/sansevieria-laurentii-snake-plant-25cm-pot-my-jungle-home-160415_lxt6q5.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Low Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Aloe Vera',
    botanicalName: 'Aloe barbadensis',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539884/aloe-vera-potted-plant-aloe__1368841_pe957973_s5_hpimjy.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Jade Plant',
    botanicalName: 'Crassula ovata',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539908/beautiful-crassula-ovata-jade-plant-money-plant-royalty-free-image-1722349156.jpg_qlw1gn.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Echeveria',
    botanicalName: 'Echeveria elegans',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539932/20220816_184151_2048x_lqg2sj.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'String of Pearls',
    botanicalName: 'Senecio rowleyanus',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539957/string-of-pearls-plant-30347238998058_grande_sq0txv.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Medium' as const,
    category: 'Succulents'
  },
  {
    name: 'Haworthia',
    botanicalName: 'Haworthia cooperi',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748539986/Haworthiacooperi_9_qoahjo.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Indirect Light',
    careLevel: 'Easy' as const,
    category: 'Succulents'
  },
  {
    name: 'Barrel Cactus',
    botanicalName: 'Ferocactus wislizeni',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents',
    description: 'A classic desert cactus with a distinctive barrel shape and prominent spines. Very drought tolerant and perfect for sunny windowsills.',
    toxicity: 'Non-toxic but has sharp spines',
    temperature: '70-80°F (21-27°C)',
    humidity: '10-30%',
    careInstructions: [
      'Water deeply but infrequently',
      'Ensure excellent drainage',
      'Provide maximum sunlight',
      'Avoid watering in winter',
      'Use cactus-specific potting mix'
    ],
    commonProblems: [
      'Root rot: Usually from overwatering',
      'Soft/mushy sections: Sign of rot, needs immediate attention',
      'Lack of growth: May need more light or nutrients',
      'Pests: Watch for mealybugs and scale'
    ]
  },
  {
    name: 'Sedum',
    botanicalName: 'Sedum morganianum',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Bi-weekly',
    suggestedWateringDays: 14,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents',
    description: 'Also known as Burro\'s Tail, this trailing succulent has thick, blue-green leaves that cascade beautifully from hanging baskets.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-75°F (18-24°C)',
    humidity: '20-40%',
    careInstructions: [
      'Water when soil is completely dry',
      'Handle carefully as leaves drop easily',
      'Provide bright, direct sunlight',
      'Use well-draining succulent soil',
      'Propagate from fallen leaves'
    ],
    commonProblems: [
      'Leaf drop: Natural when touched or from overwatering',
      'Stretching: Needs more direct sunlight',
      'Wrinkled leaves: Usually needs water',
      'Root rot: Ensure proper drainage'
    ]
  },
  {
    name: 'Lithops',
    botanicalName: 'Lithops species',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 45,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Hard' as const,
    category: 'Succulents',
    description: 'Known as Living Stones, these fascinating succulents mimic rocks in their natural habitat. They require very specific care and watering schedules.',
    toxicity: 'Non-toxic to pets',
    temperature: '65-80°F (18-27°C)',
    humidity: '10-30%',
    careInstructions: [
      'Water only during active growing season',
      'Stop watering when splitting begins',
      'Provide maximum direct sunlight',
      'Use very well-draining mineral soil',
      'Never water during dormancy'
    ],
    commonProblems: [
      'Overwatering: Most common cause of death',
      'Stretching: Insufficient light',
      'Not splitting: Natural cycle, be patient',
      'Soft plants: Usually from too much water'
    ]
  },
  {
    name: 'Prickly Pear Cactus',
    botanicalName: 'Opuntia microdasys',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Monthly',
    suggestedWateringDays: 30,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Easy' as const,
    category: 'Succulents',
    description: 'A charming paddle-shaped cactus with fuzzy spines. Easy to care for and produces beautiful yellow flowers when mature.',
    toxicity: 'Non-toxic but has irritating glochids (tiny spines)',
    temperature: '70-80°F (21-27°C)',
    humidity: '10-30%',
    careInstructions: [
      'Water sparingly, especially in winter',
      'Provide maximum direct sunlight',
      'Use cactus potting mix with excellent drainage',
      'Handle with thick gloves to avoid glochids',
      'Allow soil to dry completely between waterings'
    ],
    commonProblems: [
      'Overwatering: Can cause root rot quickly',
      'Soft pads: Usually sign of overwatering',
      'Glochid irritation: Use tweezers to remove spines from skin',
      'Slow growth: Normal for cacti, be patient'
    ]
  },
  {
    name: 'Crown of Thorns',
    botanicalName: 'Euphorbia milii',
    image: 'https://res.cloudinary.com/dojdglovh/image/upload/v1748969790/plant-emoji_78370-262_gmqqjg.jpg',
    wateringFrequency: 'Weekly',
    suggestedWateringDays: 10,
    lightRequirement: 'Bright Direct Light',
    careLevel: 'Medium' as const,
    category: 'Succulents',
    description: 'A spiny succulent that produces colorful bracts year-round with proper care. Despite its thorns, it\'s a rewarding flowering houseplant.',
    toxicity: 'Toxic to pets and humans - sap can cause skin irritation',
    temperature: '65-75°F (18-24°C)',
    humidity: '30-40%',
    careInstructions: [
      'Water when top inch of soil is dry',
      'Provide at least 4 hours of direct sunlight',
      'Deadhead spent flowers to encourage blooming',
      'Handle with gloves due to thorns and toxic sap',
      'Fertilize monthly during growing season'
    ],
    commonProblems: [
      'Lack of flowers: Usually insufficient light',
      'Leaf drop: Natural response to stress or seasonal changes',
      'Stem rot: From overwatering in cool conditions',
      'Skin irritation: Always wear gloves when handling'
    ]
  }
];
