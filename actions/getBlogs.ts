import prisma from '@/lib/prisma';

// Define types for the function parameters
interface BlogParams {
  category?: string;
  searchTerm?: string;
}

// Define the type for the query object based on Prisma's filter capabilities
interface BlogQuery {
  category?: string;
  title?: {
    contains?: string;
    mode?: 'insensitive';
  };
  content?: {
    contains?: string;
    mode?: 'insensitive';
  };
}

export default async function getBlog(params: BlogParams = {}): Promise<any[]> {
  try {
    const { category, searchTerm } = params;
    const searchString = searchTerm || '';

    // Define the query object with appropriate types
    const query: BlogQuery = {};

    if (category) {
      query.category = category;
    }

    if (searchString) {
      query.title = { contains: searchString, mode: 'insensitive' };
      query.content = { contains: searchString, mode: 'insensitive' };
    }

    const blogs = await prisma.blog.findMany({
      where: {
        ...query,
        OR: [
          {
            title: {
              contains: searchString,
              mode: 'insensitive'
            }
          },
          {
            content: {
              contains: searchString,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        reviews: {
          include: {
            user: true, 
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        likes: true, 
      }
    });
       return blogs;
  } catch (error: unknown) {
    // Handle errors and ensure they are of type 'Error'
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
