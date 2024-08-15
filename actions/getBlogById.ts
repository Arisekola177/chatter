import prisma from '@/lib/prisma';

export default async function getBlogById(blogId: string) {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId,
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!blog) return null;

        // Return the blog object as is, assuming it includes all necessary fields including 'image'
        return blog;

    } catch (error: any) {
        // Handling the error appropriately
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}
