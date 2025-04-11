import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const plants = await prisma.plant.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, species, nickname, image, wateringFrequency } = body;

    const plant = await prisma.plant.create({
      data: {
        name,
        species,
        nickname,
        image,
        wateringFrequency,
        lastWatered: new Date(),
        userId: session.user.id,
      }
    });

    return NextResponse.json(plant);
  } catch (error) {
    console.error('Error creating plant:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 