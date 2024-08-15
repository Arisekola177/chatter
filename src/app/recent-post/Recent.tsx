import Post from "./Post"

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
    blog: Blog[];
  }


const Recent: React.FC<BlogProps> = ({blog}) => {

  return (
    <div className='md:w-9/12 xs:w-11/12 mx-auto '>
    <h2 className='text-lg font-semibold text-white text-center'>Recent Post</h2>
    <p className='w-full mx-auto py-2 mb-2 border-b-[2px] border-gray-700' />
    <Post blog={blog} />
  </div>
  )
}

export default Recent