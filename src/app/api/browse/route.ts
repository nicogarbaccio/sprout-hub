import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        id: true,
        name: true,
        species: true,
        image: true,
        wateringFrequency: true,
        lastWatered: true,
        userId: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Transform the data to match the Plant type
    const transformedPlants = plants.map(plant => ({
      id: plant.id,
      name: plant.name,
      species: plant.species,
      image: plant.image,
      lightRequirement: 'medium', // Default value since we don't store this in DB
      wateringFrequency: plant.wateringFrequency,
      careLevel: 'moderate', // Default value since we don't store this in DB
      description: '', // Default value since we don't store this in DB
      addedToCollection: false, // Will be set on the client side
    }));

    return NextResponse.json(transformedPlants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 