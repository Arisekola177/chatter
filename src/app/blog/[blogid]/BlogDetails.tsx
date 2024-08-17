'use client';

import ReviewComponent from "./Review"; 
import DOMPurify from 'dompurify';
import { useEffect } from "react";
import Addreviews from './Addreviews';
import Trending from "@/app/components/Trending";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Blog, User } from '@/lib/type'; 

interface BlogDetailsProps {
    blog: Blog;
    currentUser: User;
}


const extractFirstImage = (content: string | undefined) => {
    if (!content) return { src: null, content: '', caption: '' };

    const div = document.createElement('div');
    div.innerHTML = content;

    const img = div.querySelector('img');
    if (img) {
        img.remove();
        return { src: img.src, content: div.innerHTML, caption: img.alt || img.title || '' };
    }

    return { src: null, content: div.innerHTML, caption: '' };
};


const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, currentUser }) => {
    if (!blog) {
        return <div>Blog not found</div>;
    }

    const { src: firstImage, content: sanitizedContent, caption: firstImageCaption } = extractFirstImage(blog.content);

    useEffect(() => {
        const contentDiv = document.getElementById('remaining-content');
        if (contentDiv) {
            const images = contentDiv.querySelectorAll('img');
            images.forEach(img => {
                const caption = img.alt || img.title || '';
                img.style.width = '90%';
                img.style.height = 'auto';
                img.style.display = 'block';
                img.style.margin = 'auto';

                if (caption) {
                    const captionElement = document.createElement('figcaption');
                    captionElement.innerText = caption;
                    captionElement.style.textAlign = 'center';
                    captionElement.style.fontSize = '0.8em';
                    captionElement.style.marginTop = '0.5em';
                    img.insertAdjacentElement('afterend', captionElement);
                }
            });
        }
    }, [sanitizedContent]);

    return (
        <div className='w-full overflow-hidden'>
            <div className="xl:w-10/12 xs:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 xs:gap-2 md:gap-4 xs:p-2 md:p-4">
                <div className="flex flex-col gap-2 xs:col-span-1 md:col-span-3">
                    <div className="py-4">
                        <div className="w-full">
                            <div className="bg-orange-600 w-44">
                                <h3 className='md:text-xl xs:text-sm font-bold text-white px-2 py-1 font-mono'>{blog.category}</h3>
                            </div>
                        </div>

                        <h1 className='md:text-4xl xs:text-xl py-2 font-semibold text-white'>{blog.title}</h1>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-1">
                                <h2 className='text-sm text-white font-semibold'>Posted: {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })} by {blog.author}</h2>
                            </div>
                        </div>
                    </div>

                    {firstImage && (
                        <figure style={{ width: '100%', margin: 'auto' }}>
                            <img src={firstImage} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
                            {firstImageCaption && (
                                <figcaption className='text-center text-xs mt-2'>{firstImageCaption}</figcaption>
                            )}
                        </figure>
                    )}

                    <div className='prose prose-sm max-w-none '
                        style={{ color: 'white' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sanitizedContent) }}>
                    </div>

                    <div className="flex xs:w-full md:w-[500px] mt-16 flex-col gap-2">
                        <h2 className="text-lg font-semibold text-white">Add a Review</h2>
                        <Addreviews blog={blog} currentUser={currentUser} />
                    </div>

                    <div className="flex xs:w-full md:w-[500px] flex-col gap-2">
                        <h2 className="py-2 font-semibold text-lg text-white">Reviews</h2>
                        <ReviewComponent blog={blog} />
                    </div>
                </div>

                <div className='hidden md:block col-span-1'>
                    <Trending />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
