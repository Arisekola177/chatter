
'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    image: string;
}

interface Blog {
    id: string;
    title: string;
    category: string;
    content: string;
    reviews: [];
}

interface ReviewProps {
    currentUser: User | null;
    blog: Blog;
}

const Addreviews: React.FC<ReviewProps> = ({ blog, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            Comment: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const reviewData = {
            blogId: blog.id,
            userId: currentUser?.id,
            comment: data.Comment,
        };
        try {
            await axios.post('/api/reviews', reviewData);
            toast.success('Review Submitted');
            router.refresh();
            reset();
        } catch (error: any) {
            toast.error('Something went wrong');
            console.error('Error:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return <div>You must be logged in to submit a review.</div>;
    }

    return (
        <div className='flex flex-col gap-2 xs:w-full md:w-[500px]'>
            <textarea
                {...register('Comment', { required: true })}
                disabled={isLoading}
                placeholder='Comment'
                className='border-[1px] rounded-md border-black placeholder:xs px-5 py-4 outline-none'
            />
            {errors.Comment && <span className="text-red-500">This field is required</span>}
            <div className='w-full py-3 flex items-center justify-center rounded-md hover:bg-slate-700 duration-300 bg-slate-900'>
                <button className='w-full text-white' onClick={handleSubmit(onSubmit)} disabled={isLoading}>
                    {isLoading ? 'Sending .... ' : 'Send Review'}
                </button>
            </div>
        </div>
    );
};

export default Addreviews;


