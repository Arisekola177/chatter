import prisma from '@/lib/prisma'


export default async function getBlogById(blogId){
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
            return blog;

        
    } catch (error) {
        throw new Error(error)
    }
}