import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this path is correct
import { getUser } from '../../../../../actions/getUser'; // Adjust path as necessary

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Retrieve the current user (implementation depends on your authentication setup)
    const currentUser = await getUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Ensure ID is in the correct format
    const blogId = params.id;

    // Adjust ID conversion if needed (e.g., for numbers or UUIDs)
    // const blogId = parseInt(params.id, 10); // Use this if ID is an integer

    // Perform the delete operation
    const blog = await prisma.blog.delete({
      where: { id: blogId }, // Ensure this matches your Prisma schema
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
