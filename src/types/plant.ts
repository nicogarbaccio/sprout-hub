export type LightRequirement = 'low' | 'medium' | 'bright indirect' | 'direct';
export type CareLevel = 'easy' | 'moderate' | 'expert';

export type Plant = {
  id: string;
  name: string;
  species: string;
  image: string;
  lightRequirement: LightRequirement;
  wateringFrequency: number; // in days
  careLevel: CareLevel;
  description: string;
  addedToCollection: boolean;
};

// This type will be used later when we implement the collection feature
export type CollectedPlant = Plant & {
  lastWatered: Date;
  location: string;
  notes?: string;
}; 