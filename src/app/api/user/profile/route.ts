import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { username, email } = await req.json();

    // Validate input
    if (!username && !email) {
      return NextResponse.json(
        { message: 'No changes provided' },
        { status: 400 }
      );
    }

    // Check username format if provided
    if (username && !/^[a-zA-Z0-9_-]{3,}$/.test(username)) {
      return NextResponse.json(
        { message: 'Username must be at least 3 characters and can only contain letters, numbers, underscores and hyphens' },
        { status: 400 }
      );
    }

    // Check if username is taken (if changing username)
    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username }
      });

      if (existingUsername && existingUsername.id !== session.user.id) {
        return NextResponse.json(
          { message: 'Username is already taken' },
          { status: 400 }
        );
      }
    }

    // Check if email is taken (if changing email)
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email }
      });

      if (existingEmail && existingEmail.id !== session.user.id) {
        return NextResponse.json(
          { message: 'Email is already registered' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(username && { username }),
        ...(email && { email }),
      },
    });

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 