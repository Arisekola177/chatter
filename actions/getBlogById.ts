import prisma from '@/lib/prisma'
export default async function getBlogById(blogId:string){
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

        
    } catch (error:any) {
        throw new Error(error)
    }
}