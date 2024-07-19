import { blogData } from "@/constant/data";
import BlogDetails from "./BlogDetails";



const BlogPage = ({ params }: { params: { blogid: string } }) => {
    const { blogid } = params;
    const blog = blogData.find(blog => blog.id === blogid);


    return (
        <div>
             <BlogDetails blog={blog} /> 
        </div>
    );
};

export default BlogPage;
