import React from 'react';
import Image from "next/image";
import { Blog } from '@/lib/type'; 

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
                        <div className='flex flex-col gap-1'>
                            <span className='text-white font-semibold'>{review.user.name}</span>
                            <p className='text-white'>{review.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='text-white'>No reviews yet</p>
            )}
        </div>
    );
};

export default Review;
