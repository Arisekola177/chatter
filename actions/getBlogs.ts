import prisma from '@/lib/prisma'


export default async function getBlog(params = {}) { 
    try {
        const { category, searchTerm } = params;
        let searchString = searchTerm || '';

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
                        },
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
                }
            }
        });
        return blogs;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

