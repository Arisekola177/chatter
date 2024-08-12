
'use client'
import Review from "./Review";
import DOMPurify from 'dompurify';
import Banner from "@/app/components/Banner";
import { useEffect } from "react";
import Addreviews from './Addreviews';
import Trending from "@/app/components/Trending";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

interface Blog {
    id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    reviews: any[];
    createdAt: string;
    author: string;
}

interface User {
    id: string;
    name: string;
    image: string;
    userId: string;
    createdAt: string;
}

interface BlogDetailsProps {
    blog: Blog;
    currentUser: User | null;
}

const extractFirstImage = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    if (img) {
        img.remove();
        return { src: img.src, content: div.innerHTML, caption: img.alt || img.title || '' };
    }
    return { src: null, content, caption: '' };
};

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog, currentUser }) => {
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
        <div className='w-full'>
            <Banner />
            <div className="w-10/12 mx-auto grid grid-cols-4 gap-4 p-4">
                <div className="flex flex-col gap-2 col-span-3">
                    <div className="py-4">
                        <h3 className='text-xl font-bold bg-orange-600 text-white px-2 py-1 font-mono w-[100px]'>{blog.category}</h3>
                        <h1 className='text-4xl py-2 font-semibold text-orange-700'>{blog.title}</h1>
                        <div className="flex items-center">
                            <div className="flex flex-col gap-1">
                                <h2 className='text-sm font-semibold'>Published: {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })} by {blog.author}</h2>
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

                    <div id="remaining-content" className='prose prose-sm max-w-none text-justify'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sanitizedContent) }}>
                    </div>

                    <div className="flex w-[500px] mt-16 flex-col gap-2">
                        <h2 className="text-lg font-semibold text-orange-800">Add a Review</h2>
                        <Addreviews blog={blog} currentUser={currentUser} />
                    </div>

                    <div className="flex w-[500px] flex-col gap-2">
                        <h2 className="py-2 font-semibold text-lg text-orange-800">Reviews</h2>
                        <Review blog={blog} />
                    </div>
                </div>

                <div className='col-span-1'>
                    <h1 className='text-3xl text-orange-700 font-semibold text-start mb-10'>Trending</h1>
                    <Trending />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;

