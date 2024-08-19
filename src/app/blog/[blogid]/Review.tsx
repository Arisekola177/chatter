'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Blog, User } from '@/lib/type'; 
import { FaRegComment } from 'react-icons/fa';
import { SlLike } from 'react-icons/sl';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ReviewProps {
    blog: Blog;
    currentUser: User | null;
}

const Review: React.FC<ReviewProps> = ({ blog, currentUser }) => {
    const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null);
    const [replyText, setReplyText] = useState<string>('');
    const [replies, setReplies] = useState<{ [reviewId: string]: string[] }>({}); 

    // useEffect(() => {
    //     const fetchReplies = async () => {
    //         try {
    //             const response = await axios.get('/api/reviews/replies');
    //             setReplies(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch replies:', error);
    //         }
    //     };

    //     fetchReplies();
    // }, []);

    const toggleReplyInput = (index: number) => {
        setActiveReplyIndex(activeReplyIndex === index ? null : index);
    };

    // const submitReply = async (reviewId: string) => {
    //     if (!replyText.trim()) return;

    //     toast('Loading, please wait...');
    //     try {
    //         await axios.post('/api/reviews/replies', {
    //             reviewId,
    //             userId: currentUser?.id,
    //             comment: replyText,
    //         });

    //         setReplies(prevReplies => ({
    //             ...prevReplies,
    //             [reviewId]: [...(prevReplies[reviewId] || []), replyText]
    //         }));

    //         setReplyText('');
    //         setActiveReplyIndex(null);
    //         toast.success('Reply submitted successfully');
    //     } catch (error) {
    //         console.error('Failed to submit reply:', error);
    //         toast.error('Failed to submit reply');
    //     }
    // };

    // const renderReplies = (reviewId: string) => {
    //     return (
    //         <div className='ml-8'>
    //             {replies[reviewId]?.map((reply, index) => (
    //                 <div key={index} className='mt-2'>
    //                     <p className='text-white text-xs'>{reply}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };

    return (
        <div className='flex flex-col gap-4'>
            {blog.reviews.length > 0 ? (
                blog.reviews.map((review, index) => (
                    <div key={index} className='flex flex-col border-b border-slate-500 pb-4'>
                        <div className='flex items-center gap-4'>
                            <Image
                                alt="User"
                                height="40"
                                width="40"
                                src={review.user?.image || "/placeholder.jpg"}
                                className="h-10 w-10 rounded-full"
                            />
                            <span className='text-white font-semibold'>{review.user?.name}</span>
                        </div>
                        <div className='px-14 py-3'>
                            <p className='text-white text-xs'>{review.comment}</p>
                            <div className='flex items-center gap-6 mt-4'>
                                <div className='font-semibold text-xs flex items-center gap-2 cursor-pointer text-white'>
                                    <div className='flex gap-1 items-center'>
                                        <FaRegComment />
                                        <span>{(replies[review.id] || []).length}</span>
                                    </div>
                                    <span onClick={() => toggleReplyInput(index)}>reply</span>
                                </div>
                                <div className='font-semibold text-xs flex items-center gap-1 cursor-pointer text-white'>
                                    <SlLike /><span>0</span>
                                </div>
                            </div>
                            {activeReplyIndex === index && (
                                <div className='mt-2'>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className='w-full p-2 text-sm text-black rounded-md'
                                        rows={3}
                                        placeholder='Write your reply...'
                                    />
                                    <button
                                        
                                        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                         
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
