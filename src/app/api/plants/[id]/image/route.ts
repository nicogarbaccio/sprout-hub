import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    // First verify the plant belongs to the user
    const plant = await prisma.plant.findUnique({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!plant) {
      return new NextResponse('Plant not found', { status: 404 });
    }

    const updatedPlant = await prisma.plant.update({
      where: {
        id: params.id
      },
      data: {
        image
      }
    });

    return NextResponse.json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 