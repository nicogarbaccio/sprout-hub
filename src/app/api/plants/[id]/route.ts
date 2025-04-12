import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
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

    await prisma.plant.delete({
      where: {
        id: params.id
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting plant:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

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
    const { nickname, wateringFrequency, lastWatered } = body;

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
        ...(nickname !== undefined && { nickname }),
        ...(wateringFrequency !== undefined && { wateringFrequency }),
        ...(lastWatered !== undefined && { lastWatered: new Date(lastWatered) })
      }
    });

    return NextResponse.json(updatedPlant);
  } catch (error) {
    console.error('Error updating plant:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 