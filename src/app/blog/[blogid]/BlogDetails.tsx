import Image from "next/image";
import Review from "./Review";


interface Blog {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    reviews: any[];
}

interface BlogDetailsProps {
    blog: Blog;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
    return (
        <div className='w-8/12 mx-auto bg-slate-100 '>
              <div className='grid grid-cols-2 gap-4 p-4'>
                   <div>
                    <Image src={blog.image} width={400} height={400} alt={blog.title} />
                    <div className='text-sm py-2 font-semibold'>Posted: 3 days ago by Azeez</div>
                   </div>
                   <div className='flex flex-col gap-2'>
                            <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
                            <h2 className='text-xl font-semibold text-red-700'>{blog.title}</h2>
                            <p className='text-sm text-justify'>{blog.description}</p>
                   </div>
              </div> 
              <div className="flex w-[400px]  flex-col gap-2 p-4">
                  <h2 className="text-lg text-center font-semibold text-red-800">Add Review</h2>
                  <form className="flex flex-col gap-4">
                   <textarea placeholder="add review" className="py-4 px-10 rounded-md placeholder:text-xs outline-none"/>
                   <button className="bg-red-900 text-white py-2 px-4 text-sm rounded-md hover:bg-red-950">Submit</button>
                  </form>
             </div> 
             <div className="flex w-[400px] flex-col gap-2 px-4">
                <h2 className="text-center py-2 text-lg text-red-800">Comments</h2>
                  <Review blog={blog} />
            </div> 
        </div>
    );
};

export default BlogDetails;
