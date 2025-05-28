
import { Plant } from './types';
import { floweringPlants } from './plants/flowering-plants';
import { tropicalPlants } from './plants/tropical-plants';
import { succulents } from './plants/succulents';
import { hangingTrailingPlants } from './plants/hanging-trailing';
import { treesLargePlants } from './plants/trees-large';
import { otherPlants } from './plants/other-categories';
import { getUniqueCategories, getUniqueCareLevels, getUniqueLightRequirements } from './utils';

// Re-export the Plant interface for backward compatibility
export type { Plant };

// Combine all plant arrays
export const plants: Plant[] = [
  ...floweringPlants,
  ...tropicalPlants,
  ...succulents,
  ...hangingTrailingPlants,
  ...treesLargePlants,
  ...otherPlants
];

// Re-export utility functions with plants array applied
export const getUniqueCategories = () => getUniqueCategories(plants);
export const getUniqueCareLevels = () => getUniqueCareLevels(plants);
export const getUniqueLightRequirements = () => getUniqueLightRequirements(plants);
