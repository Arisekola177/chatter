import prisma from '@/lib/prisma';

interface BlogParams {
    category?: string;
    searchTerm?: string;
  }

export default async function getBlog(params: BlogParams = {}) { 
    try {
        const { category, searchTerm } = params;
        const searchString = searchTerm || '';

        let query = {};

        if (category) {
            query.category = category;
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
                        category: {
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

        return blogs.map(blog => ({
            ...blog,
            reviews: blog.reviews.map(review => ({
                ...review,
                user: review.user || null 
            })),
            likes: blog.likes.map(like => ({
                ...like,
                user: like.user || null 
            }))
        }));
    } catch (error: any) {
        throw new Error(error.message);
    }
}




              
          

