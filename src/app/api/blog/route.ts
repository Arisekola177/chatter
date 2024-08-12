
import { NextResponse } from 'next/server';
import { getUser } from '../../../../actions/getUser';
import prisma from '@/lib/prisma'

export async function POST(req: Request) {

    const currentUser = await getUser()

  try {
    const body = await req.json();

    const { title, content, category, imageUrl } = body;


    const blog = await prisma.blog.create({
      data: {
        content,
        title,
        category,
        images:imageUrl,
        userId: currentUser?.id,
        author: currentUser?.name,
      }
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}

