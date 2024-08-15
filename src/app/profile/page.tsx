import getBlogsByUserId from "../../../actions/getBlogsByUserId";
import { getUser } from "../../../actions/getUser";
import Profile from "./Profile"

const page = async () => {
    const currentUser = await getUser();
    const blog = await getBlogsByUserId(currentUser!.id)
  return (
    <div className="">
        <Profile currentUser={currentUser} blog={blog} />
    </div>
  )
}

export default page