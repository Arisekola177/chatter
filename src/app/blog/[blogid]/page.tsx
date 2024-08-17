

import BlogDetails from "./BlogDetails";
import { getUser } from "../../../../actions/getUser";
import getBlogById from "../../../../actions/getBlogById";
import { notFound } from "next/navigation";

const BlogPage = async ({ params }: { params: { blogid: string } }) => {
    const { blogid } = params;
    const currentUser = await getUser();
    const blog = await getBlogById(blogid);

    if (!blog || !currentUser) {
        notFound();
        return null; 
    }

    return (
        <div>
            <BlogDetails blog={blog} currentUser={currentUser} />
        </div>
    );
};

export default BlogPage;


