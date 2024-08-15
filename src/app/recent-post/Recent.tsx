import Post from "./Post"
import { Blog, User } from "@/lib/type";

  
  interface BlogProps {
    blog: Blog[];
    currentUser: User | null;
  }


const Recent: React.FC<BlogProps> = ({blog, currentUser}) => {

  return (
    <div className='md:w-9/12 xs:w-11/12 mx-auto '>
    <h2 className='text-lg font-semibold text-white text-center'>Recent Post</h2>
    <p className='w-full mx-auto py-2 mb-2 border-b-[2px] border-gray-700' />
    <Post blog={blog} currentUser={currentUser} />
  </div>
  )
}

export default Recent