
'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { SlLike } from "react-icons/sl";
import ReactPaginate from 'react-paginate';
import DOMPurify from 'dompurify';
import Nulldata from '../components/Nulldata';
import { toast } from 'react-toastify';
import { storage } from '../firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Image from 'next/image';
import {User, Blog} from '@/lib/type'


interface BlogProps {
  currentUser: User | null;
  blog: Blog[];
}

const Post: React.FC<BlogProps> = ({ blog = [], currentUser }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 3;

  // Sort blogs by createdAt in descending order
  const sortedBlogs = blog.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const offset = currentPage * productsPerPage;
  const currentBlog = sortedBlogs.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(sortedBlogs.length / productsPerPage);

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
    return <Nulldata title="Oops! No Blog Yet." />;
  }

  return (
    <>
      {currentBlog.map((blog) => {
        const plainTextContent = extractPlainText(blog.content);
        const truncatedContent = truncateText(plainTextContent, 200);
        const firstImage = extractFirstImage(blog.content);

        return (
          <div className='w-full md:gap-4 xs:gap-2 md:px-3 xs:px-1 grid xs:grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 border-b-[1px] border-slate-500 py-3' key={blog.id}>
            <div className='xl:w-[300px] md:w-[200px] md:h-[200px] lg:w-[230px]  xs:w-full xl:h-[200px] rounded-md col-span-1'>
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
            <div className='flex flex-col md:col-span-1 xxl:col-span-2 gap-2'>
              <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
              <h2 className='xl:text-xl xs:text-sm  md:text-xs font-semibold text-white'>{blog.title}</h2>
              <p className='prose prose-sm xs:text-xs md:text-[8px] lg:text-sm max-w-none text-white'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedContent) }}>
              </p>
              <div className='flex items-center xs:gap-2 md:gap-4'>
                <div className='font-semibold text-xs flex items-center gap-1 text-white'>
                  <FaRegComment /><span>{blog.reviews ? blog.reviews.length : 0}</span>
                </div>
                <div className='font-semibold text-xs flex items-center gap-1 text-white'>
                  <SlLike /><span>{blog.likes ? blog.likes.length : 0}</span>
                </div>
                <div onClick={() => router.push(`/blog/${blog.id}`)}
                  className=' border-b-[2px] border-red-700 cursor-pointer hover:font-semibold hover:text-red-900 md:text-[8px] lg:text-sm text-red-700'>
                  Read more
                </div>
                <div className='flex justify-end items-center gap-2 py-2'>
                <div onClick={() => handleDelete(blog.id, [{ image: blog.images?.[0] || 'https://randomuser.me/api/portraits/men/1.jpg' }])} 
                      className='bg-red-700 text-white rounded-md py-1 cursor-pointer text-xs px-4'>
                      Delete
                    </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center gap-4 py-16 mt-20">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'flex items-center p-0'}
          pageClassName={'mx-1'}
          pageLinkClassName={'p-2 border text-xs border-white rounded-lg text-white hover:text-black cursor-pointer hover:bg-white'}
          previousClassName={'mx-1'}
          previousLinkClassName={'p-2 border text-xs border-white text-white hover:text-black rounded-lg hover:bg-white cursor-pointer'}
          nextClassName={'mx-1'}
          nextLinkClassName={'p-2 border text-xs border-white text-white hover:text-black rounded-lg cursor-pointer hover:bg-white '}
          activeClassName={'bg-slate-800 text-xs rounded-full text-white hover:text-black'}
        />
      </div>
    </>
  );
}

export default Post;

