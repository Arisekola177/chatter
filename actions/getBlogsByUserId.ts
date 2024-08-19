

import prisma from '@/lib/prisma';

export default async function getBlogsByUserId(userId: string) {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true, 
                reviews: {
                    include: {
                        user: true, 
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                likes: {
                    include: {
                        user: true, 
                    }
                }
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