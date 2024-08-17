'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import DOMPurify from 'dompurify';
import { formatDistanceToNow } from 'date-fns';
import Trending from './Trending';
import { SlLike } from 'react-icons/sl';
import { toast } from 'react-toastify';
import PostForm from './PostForm';
import Profile from './Profile';
import axios from 'axios';
import {User, Blog} from '@/lib/type'


interface BlogProps {
  blogData: Blog[];
  currentUser: User ;
}

const Post: React.FC<BlogProps> = ({ blogData: initialBlogData, currentUser }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [blogData, setBlogData] = useState(initialBlogData); 

  const productsPerPage = 5;
  const offset = currentPage * productsPerPage;
  const pageCount = Math.ceil(blogData.length / productsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('hasShownWelcome');
  
    if (currentUser && currentUser.name && !hasShownWelcome) {
      toast.success(`Welcome ${currentUser.name}`);
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }, [currentUser]);



  useEffect(() => {
    const userLikedPosts = blogData
      .filter(blog => blog.likes && Array.isArray(blog.likes) && blog.likes.some(like => like && like.userId === currentUser.id))
      .map(blog => blog.id);
    
    setLikedPosts(userLikedPosts);
  }, [blogData, currentUser]);
  

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
 

  const handleLike = async (blogId: string) => {
    try {
      const alreadyLiked = likedPosts.includes(blogId);
      const response = await axios.post('/api/blog/like', { blogId });
      if (response.status === 200) {
        const updatedBlogData = blogData.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                likes: alreadyLiked
                  ? blog.likes?.filter((like) => like.userId !== currentUser.id)
                  : [...(blog.likes || []), response.data.like].filter(Boolean), 
              }
            : blog
        );
  
        setBlogData(updatedBlogData);
        setLikedPosts(
          alreadyLiked
            ? likedPosts.filter((id) => id !== blogId)
            : [...likedPosts, blogId]
        );
        toast.success(
          alreadyLiked ? "Post unliked successfully!" : "Post liked successfully!"
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to toggle the like. Please try again.");
    }
  };
  
  return (
    <div className="xl:w-10/12 md:w-full md:px-2 xl:px-0 xs:w-11/12 mx-auto grid xs:grid-cols-1 md:grid-cols-4 xl:grid-cols-5 xs:gap-2 xl:gap-4 py-4 mt-5">
      <div className='hidden md:block col-span-1'>
        <Profile />
      </div>
      <div className="xs:col-span-1 md:col-span-2 xl:col-span-3">
        <div className='w-full'>
          <PostForm />
        </div>
        <div>
          {sortedBlogData.slice(offset, offset + productsPerPage).map((blog) => {
            const firstImage = extractFirstImage(blog.content);
            const plainTextContent = extractPlainText(blog.content);
            const truncatedContent = truncateText(plainTextContent, 300);

            return (
              <div className='grid xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-2 xl:gap-6 xxl:gap-2 mb-3 border-[2px] border-slate-500 p-4 rounded-md' key={blog.id}>
                <div className='xxl:w-[230px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xs:w-full xxl:h-[200px] rounded-md col-span-1'>
                  {firstImage && (
                    <Image 
                      src={firstImage} 
                      width={230} 
                      height={200} 
                      alt={blog.title} 
                      className='object-cover w-full h-full' 
                    />
                  )}
                  {/* <div className='hidden md:block text-sm font-normal text-white mt-4'>Posted: {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })} by {blog.author}</div> */}
                </div>
                <div className='flex flex-col gap-2 md:col-span-1 xl:col-span-2 xs:mt-2 md:mt-0'>
                  <h3 className='xl:text-sm md:text-xs font-medium text-purple-800'>{blog.category}</h3>
                  <h2 className='xl:text-xl xs:text-sm  md:text-xs font-semibold text-white'>{blog.title}</h2>
                  <p className='prose xs:text-xs prose-sm md:text-[8px] xl:text-xs max-w-none text-white '
                     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedContent) }}>
                  </p>
                  <div className='flex items-center gap-6'>
                    {/* Comment count */}
                    <div className='font-semibold text-xs flex items-center gap-1 cursor-pointer text-white'>
                      <FaRegComment /><span>{blog.reviews ? blog.reviews.length : 0}</span>
                    </div>

                    {/* Like count */}
                    <div className='font-semibold text-xs flex items-center gap-1 cursor-pointer text-white'>
                  <SlLike
                className={likedPosts.includes(blog.id) ? 'text-red-500' : 'text-white'}
               onClick={() => handleLike(blog.id)}
               />
              <span>{blog.likes ? blog.likes.length : 0}</span>
             </div>

                    {/* Read more */}
                    <div onClick={() => router.push(`/blog/${blog.id}`)} className='w-20 border-b-[2px] border-orange-700 cursor-pointer hover:font-semibold hover:text-orange-900 xs:text-sm md:text-xs xl:text-sm text-orange-700'>Read more</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 my-10">
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
      </div>
      <div className='hidden md:block col-span-1'>
        <Trending />
      </div>
    </div>
  );
}

export default Post;
