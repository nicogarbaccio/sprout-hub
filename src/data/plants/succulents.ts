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
  }
];
