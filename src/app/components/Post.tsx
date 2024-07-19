'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa'
import { IoMdHeart } from 'react-icons/io';
import ReactPaginate from 'react-paginate';

  interface Blog {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    reviews: [];
  }
  
  interface BlogProps {
    blogData: Blog[];
  }
  

  const Post: React.FC<BlogProps> = ({ blogData }) => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 5; 
  
    const offset = currentPage * productsPerPage;
    const currentProducts = blogData.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(blogData.length / productsPerPage);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  return (
    <div className="w-8/12 mx-auto bg-slate-100 py-4">
        <div className="w-10/12 mx-auto  ">
            {
                blogData.map((blog) => (
                    <div className='grid grid-cols-2 py-3' key={blog.id}>
                        <div>
                            <Image src={blog.image} width={400} height={200} className='object-contain' alt={blog.title} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
                            <h2 className='text-xl font-semibold text-red-700'>{blog.title}</h2>
                            <p className='text-sm text-justify'>{blog.description.substring(0, 400)}.....</p>
                            <div className='flex items-center gap-2'>
                                <div className='text-sm font-semibold'>Posted: 3 days ago by Azeez</div>
                                <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><FaComment /><span>3</span></div>
                                <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><IoMdHeart /><span>3</span></div>
                                <div onClick={() => router.push(`/blog/${blog.id}`)}
                                className='ml-4 border-b-[2px] border-red-700 cursor-pointer hover:font-semibold hover:text-red-900 text-sm text-red-700'>Ream more</div>
                            </div>
                        </div>
                        <p className='w-[98%] col-span-2 mx-auto py-2 border-b-[2px] border-red-700'/>
                   </div>
                ) )
            }
            
        </div>
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
          activeClassName={'bg-blue-500 text-xs text-white rounded-full'}
        />
      </div>
    </div>
  )
}

export default Post