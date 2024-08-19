
import prisma from '@/lib/prisma';

interface BlogParams {
  category?: string;
  searchTerm?: string;
}

interface BlogQuery {
  category?: string;
  OR?: Array<{
    title?: {
      contains: string;
      mode: 'insensitive';
    };
    content?: {
      contains: string;
      mode: 'insensitive';
    };
  }>;
}

export default async function getBlog(params: BlogParams = {}): Promise<any[]> {
  try {
    const { category, searchTerm } = params;
    const searchString = searchTerm || '';

    let query: BlogQuery = {};

    if (category) {
      query.category = category;
    }

    if (searchString) {
      query.OR = [
        { title: { contains: searchString, mode: 'insensitive' } },
        { content: { contains: searchString, mode: 'insensitive' } },
      ];
    }

    console.log('Constructed query:', JSON.stringify(query, null, 2)); // Log the query in a readable format

    const blogs = await prisma.blog.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
      },
    });

    return blogs;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message); // Log the error message
      throw new Error(error.message);
    } else {
      console.error('An unknown error occurred');
      throw new Error('An unknown error occurred');
    }
  }
}

