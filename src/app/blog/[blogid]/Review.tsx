import React from 'react';
import Image from "next/image";
import { Blog } from '@/lib/type'; 
import { FaRegComment } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';

interface ReviewProps {
    blog: Blog;
}

const Review: React.FC<ReviewProps> = ({ blog }) => {
    return (
        <div className='flex flex-col gap-4'>
            {blog.reviews.length > 0 ? (
                blog.reviews.map((review: any, index: number) => (
                    <div key={index} className='flex border-b-[1px] border-slate-500 flex-col gap-2'>
                        <div className='flex items-center gap-4'>
                         <div className="h-10 w-10 rounded-full">
                            <Image
                                alt="User"
                                height="40"
                                width="40"
                                src={review.user.image || "/placeholder.jpg"}
                                className="rounded-full"
                            />
                            
                        </div>
                        <span className='text-white font-semibold'>{review.user.name}</span>
                    </div>
                        <div className='px-14 py-3'>
                            <p className='text-white text-xs'>{review.comment}</p>
                         <div className='flex items-center gap-4 mt-4'>  
                      <div className='font-semibold text-xs flex items-center gap-1 cursor-pointer text-white'>
                      <FaRegComment /><span>0</span>
                       </div>
                        <div className='font-semibold text-xs flex items-center gap-1 cursor-pointer text-white'>
                               <SlLike/><span>0</span>
                     </div>
                     </div>
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
