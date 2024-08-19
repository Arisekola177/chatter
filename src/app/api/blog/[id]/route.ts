
interface PrismaError extends Error {
  code?: string; 
}

function isPrismaError(error: any): error is PrismaError {
  return error instanceof Error && 'code' in error;
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUser } from '../../../../../actions/getUser';

interface Params {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const currentUser = await getUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const blogId = params.id;

    const blog = await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error deleting blog:', error);

    if (isPrismaError(error) && error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
