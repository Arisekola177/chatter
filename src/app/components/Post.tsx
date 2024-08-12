
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaComment, FaRegComment } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import DOMPurify from 'dompurify';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Trending from './Trending';
import { SlLike } from 'react-icons/sl';

interface Blog {
  id: string;
  title: string;
  category: string;
  content: string;
  reviews: [];
  createdAt: string;
  image?: string;
  author: string;
}



interface BlogProps {
  blogData: Blog[];

}

const Post: React.FC<BlogProps> = ({ blogData }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  const offset = currentPage * productsPerPage;
  const currentProducts = blogData.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(blogData.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
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

  const sortedBlogData = [...blogData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());



  return (
    <div className="w-10/12 mx-auto grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        {sortedBlogData.slice(offset, offset + productsPerPage).map((blog) => {
          const firstImage = extractFirstImage(blog.content);
          const plainTextContent = extractPlainText(blog.content);
          const truncatedContent = truncateText(plainTextContent, 300);

          return (
            <div className='grid grid-cols-2 py-3' key={blog.id}>
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
              <div className='col-span-1 flex flex-col gap-2'>
                <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
                <h2 className='text-xl font-semibold text-orange-800'>{blog.title}</h2>
                <p className='prose prose-sm max-w-none text-justify'
                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedContent) }}>
                </p>
                <div className='text-sm font-semibold'>Posted: {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })} by {blog.author}</div>
                <div className='flex items-center gap-2'>
                  <div className='font-semibold text-xs flex items-center gap-1 text-purple-800'><FaRegComment /><span>3</span></div>
                  <div className='font-semibold text-xs flex items-center gap-1 text-purple-800'><SlLike /><span>3</span></div>
                </div>
                <div onClick={() => router.push(`/blog/${blog.id}`)} className='w-20 border-b-[2px] border-orange-700 cursor-pointer hover:font-semibold hover:text-orange-900 text-sm text-orange-700'>Read more</div>
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
            pageLinkClassName={'p-2 border text-xs border-orange-300 rounded-lg cursor-pointer'}
            previousClassName={'mx-1'}
            previousLinkClassName={'p-2 border text-xs border-orange-300 rounded-lg cursor-pointer'}
            nextClassName={'mx-1'}
            nextLinkClassName={'p-2 border text-xs border-orange-300 rounded-lg cursor-pointer'}
            activeClassName={'bg-orange-500 text-xs text-white rounded-full'}
          />
        </div>
      </div>
      <div className='col-span-1'>
        <h1 className='text-2xl text-orange-700 font-semibold text-center'>Trending</h1>
          <Trending />
      </div>
    </div>
  );
}

export default Post;

