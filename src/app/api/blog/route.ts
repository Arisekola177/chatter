import { NextResponse } from 'next/server';
import { getUser } from '../../../../actions/getUser';
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, category, imageUrl } = body;

    const currentUser = await getUser();

    if (!currentUser || !currentUser.id || !currentUser.name ) {
      return NextResponse.json({ error: 'User not authenticated or missing user information' }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        content: description,
        title,
        category,
        images: imageUrl,
        userId: currentUser.id,
        author: currentUser.name,
      }
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}
