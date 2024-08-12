import prisma from '@/lib/prisma'


export default async function getBlogsByUserId(userId: string){
    try {
         const blogs = await prisma.blog.findMany({
            include:{
                user: true
            },
            where: {
                userId: userId
            }
         })
         return blogs
    } catch (error: any) {
        throw new Error(error)
    }
}