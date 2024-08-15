import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { userId, image } = body;

    if (!userId || !image) {
      return NextResponse.json({ error: 'User ID and image URL are required.' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId }, 
      data: { image: image }, 
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Failed to update user profile.' }, { status: 500 });
  }
}
