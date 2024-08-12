import Post from "./Post"

interface Blog {
    id: string;
    title: string;
    category: string;
    content: string;
    reviews: [];
  }
  
  interface BlogProps {
    blog: Blog[];
  }


const Recent: React.FC<BlogProps> = ({blog}) => {
  return (
    <div className='w-9/12 mx-auto '>
    <h2 className='text-lg font-semibold text-orange-800 text-center'>Recent Post</h2>
    <p className='w-full mx-auto py-2 mb-2 border-b-[2px] border-gray-700' />
    <Post blog={blog} />
  </div>
  )
}

export default Recent