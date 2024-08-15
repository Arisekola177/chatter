// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'
// import { getUser } from '../../../../actions/getUser';


// export async function POST(req:Request) {
//     try {
//         const currentUser = await getUser();

//         if (!currentUser) {
//             console.error("User not authenticated");
//             return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
//         }

//         const body = await req.json();
      
//         const { comment,  blogId } = body;

//         if (!blogId || !comment  === undefined) {
//             console.error("Invalid request body");
//             return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
//         }

//         const blog = await prisma.blog.findUnique({
//             where: { id: blogId },
//             include: { reviews: true } 
//         });

//         if (!blog) {
//             console.error("Blog not found");
//             return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
//         }


//         const userReview = blog.reviews.find(review => review.userId === currentUser.id);

//         const review = await prisma.review.create({
//             data: {
//                 comment,
//                 blogId: blog.id,
//                 userId: currentUser.id,

//             },
//         });

//         return NextResponse.json(review);

//     } catch (error) {
//         console.error("Error creating review:", error);
//         return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUser } from '../../../../actions/getUser';

export async function POST(req: Request) {
    try {
        const currentUser = await getUser();

        if (!currentUser) {
            console.error("User not authenticated");
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const body = await req.json();
        const { comment, blogId } = body;

        if (!blogId || comment === undefined) {
            console.error("Invalid request body");
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: { reviews: true },
        });

        if (!blog) {
            console.error("Blog not found");
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const review = await prisma.review.create({
            data: {
                comment,
                blogId: blog.id,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(review);
    } catch (error: unknown) {
        console.error("Error creating review:", error);

        if (error instanceof Error) {
            return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
        }
    }
}
