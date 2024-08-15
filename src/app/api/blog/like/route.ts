import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUser } from '../../../../../actions/getUser';

export async function POST(req: Request) {
  try {
    const currentUser = await getUser();
    const body = await req.json();
    const { blogId } = body;

    if (!currentUser) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    // Check if the like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId: currentUser.id,
          blogId: blogId,
        },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ message: 'Post unliked successfully', like: existingLike });
    } else {
      // Like the post
      const newLike = await prisma.like.create({
        data: {
          userId: currentUser.id,
          blogId: blogId,
        },
      });
      return NextResponse.json({ message: 'Post liked successfully', like: newLike });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
