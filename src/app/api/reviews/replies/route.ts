import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(request: Request) {
  try {
    const { reviewId, userId, comment } = await request.json();

    if (!reviewId || !userId || !comment) {
      console.error("Invalid request body:", { reviewId, userId, comment });
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parentReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!parentReview) {
      return NextResponse.json({ error: 'Parent review not found' }, { status: 404 });
    }

    const reply = await prisma.review.create({
      data: {
        comment,
        userId,
        blogId: parentReview.blogId, 
        parentReviewId: reviewId,  // Ensure this is set correctly
      },
    });

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
  }
}


// export async function POST(request: Request) {
//   try {
//     const { reviewId, userId, comment } = await request.json();

//     if (!reviewId || !userId || !comment) {
//       console.error("Invalid request body:", { reviewId, userId, comment });
//       return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
//     }

//     const parentReview = await prisma.review.findUnique({
//       where: { id: reviewId },
//     });

//     if (!parentReview) {
//       return NextResponse.json({ error: 'Parent review not found' }, { status: 404 });
//     }

//     const reply = await prisma.review.create({
//       data: {
//         comment,
//         userId,
//         blogId: parentReview.blogId, 
//         parentReviewId: reviewId,
//       },
//     });

//     return NextResponse.json(reply, { status: 201 });
//   } catch (error) {
//     console.error("Error creating reply:", error);
//     return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 });
//   }
// }

