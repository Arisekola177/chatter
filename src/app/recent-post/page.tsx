
import getBlogsByUserId from "../../../actions/getBlogsByUserId";
import { getUser } from "../../../actions/getUser";
import Recent from "./Recent";
export const dynamic = 'force-dynamic';

const page = async () => {
  try {
    const currentUser = await getUser();
    if (!currentUser) {
      return <div>User not found</div>; // Or redirect to an error page
    }

    const blog = await getBlogsByUserId(currentUser.id);

    return (
      <div className="md:w-10/12 xs:w-11/12 mx-auto py-8">
        <Recent blog={blog} currentUser={currentUser} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user or blogs:", error);
    return <div>Error loading page</div>; // Or redirect to an error page
  }
};

export default page;
