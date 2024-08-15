// import prisma from '@/lib/prisma'


// export default async function getBlogsByUserId(userId: string){
//     try {
//          const blogs = await prisma.blog.findMany({
//             include:{
//                 user: true
//             },
//             where: {
//                 userId: userId
//             }
//          })
//          return blogs
//     } catch (error: any) {
//         throw new Error(error)
//     }
// }

import prisma from '@/lib/prisma';

export default async function getBlogsByUserId(userId: string) {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true, // Include user details
                reviews: {
                    include: {
                        user: true, // Include user details for each review
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                likes: {
                    include: {
                        user: true, // Include user details for each like
                    }
                }
            }
        });

        // Optionally, you can process the data if needed, like handling null cases
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