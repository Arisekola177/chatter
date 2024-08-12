'use client'
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {  FaRegComment } from 'react-icons/fa';
import { SlLike } from "react-icons/sl"
import ReactPaginate from 'react-paginate';
import DOMPurify from 'dompurify';
import Nulldata from '../components/Nulldata';
import { toast } from 'react-toastify';
import { storage } from '../firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  category: string;
  content: string;
  reviews: [];
}
interface User {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
}

interface BlogProps {
  blog: Blog[];
  currentUser: User[];
}

const Post: React.FC<BlogProps> = ({ blog, currentUser }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 3;

  const offset = currentPage * productsPerPage;
  const currentBlog = blog.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(blog.length / productsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const extractFirstImage = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : null;
  };

  const extractPlainText = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.textContent || div.innerText || '';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDelete = useCallback(async (id: string, images: { image: string }[]) => {
    toast("Deleting blog, please wait ....... ");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Image deleted:", item.image);
          }
        }
      } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
          console.log('Image not found:', error.message);
        } else {
          console.log('Error deleting images:', error);
        }
      }
    };

    await handleImageDelete();

    try {
      await axios.delete(`/api/blog/${id}`);
      toast.success('Blog deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      toast.error('Blogs with reviews can only be deleted from the database');
    }
  }, [router]);

  

  if (currentBlog.length === 0) {
    return <Nulldata title="Oops! No Blog Yet. " />;
  }

  return (
    <>
      {currentBlog.map((blog) => {
        const plainTextContent = extractPlainText(blog.content);
        const truncatedContent = truncateText(plainTextContent, 200);
        const firstImage = extractFirstImage(blog.content);

        return (
          <div className='w-9/12 mx-auto gap-4 px-3 grid grid-cols-2 py-3' key={blog.id}>
             <div className='w-[400px] h-[300px] rounded-md col-span-1'>
                {firstImage && (
                  <Image 
                    src={firstImage} 
                    width={400} 
                    height={300} 
                    alt={blog.title} 
                    className='object-cover w-full h-full' 
                  />
                )}
              </div>
            <div className='flex flex-col col-span-1 gap-4'>
              <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
              <h2 className='text-xl font-semibold text-red-700'>{blog.title}</h2>
              <p className='prose prose-sm max-w-none text-justify'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedContent) }}>
              </p>
              <div className='flex items-center gap-2'>
 
 <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><FaRegComment /><span>3</span></div>
 <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><SlLike /><span>3</span></div>
 <div onClick={() => router.push(`/blog/${blog.id}`)}
   className='ml-4 border-b-[2px] border-red-700 cursor-pointer hover:font-semibold hover:text-red-900 text-sm text-red-700'>Read more</div>
</div>
<div className='flex items-center gap-2 py-2'>
 <div onClick={() => handleDelete(blog.id, [{ image: blog.image }])} className='bg-red-700 text-white rounded-md py-1 cursor-pointer text-xs  px-4'>
   Delete
 </div>
</div>
            </div>

          
          </div>
        );
      })}
      <div className="flex items-center justify-center my-8">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'flex items-center p-0'}
          pageClassName={'mx-1'}
          pageLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          previousClassName={'mx-1'}
          previousLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          nextClassName={'mx-1'}
          nextLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          activeClassName={'bg-red-500 text-xs text-white rounded-full'}
        />
      </div>
    </>
  );
}

export default Post;

