


import BlogDetails from "./BlogDetails";
import { getUser } from "../../../../actions/getUser";
import getBlogById from "../../../../actions/getBlogById";

const BlogPage = async ({ params }: { params: { blogid: string } }) => {
    const { blogid } = params;
    const currentUser = await getUser();
    const blog = await getBlogById(blogid);

    return (
        <div>
            <BlogDetails blog={blog} currentUser={currentUser} />
        </div>
    );
};

export default BlogPage;


