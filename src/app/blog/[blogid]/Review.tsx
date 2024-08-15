


import React from 'react';
import Image from "next/image";


interface Blog {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    reviews: [];
    createdAt: string;
    author: string;
}

interface ReviewProps {
    blog: Blog;
}

const Review: React.FC<ReviewProps> = ({ blog }) => {
    return (
        <div className='flex flex-col gap-4'>
            {blog.reviews.length > 0 ? (
                blog.reviews.map((review: any, index: number) => (
                    <div key={index} className='flex items-center gap-4'>
                        <div className="h-10 w-10 rounded-full">
                            <Image
                                alt="User"
                                height="40"
                                width="40"
                                src={review.user.image || "/placeholder.jpg"}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className='font-bold'>{review.user.name}</p>
                            <p className='text-sm'>{review.comment}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-white font-semibold'>No reviews yet.</p>
            )}
        </div>
    );
};

export default Review;

