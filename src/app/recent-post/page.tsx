import getBlogsByUserId from "../../../actions/getBlogsByUserId"
import { getUser } from "../../../actions/getUser"
import Recent from "./recent"

const page = async () => {
    const currentUser = await getUser()
    const blog = await getBlogsByUserId(currentUser.id)
  return (
    <div className="w-10/12 mx-auto py-8">
       <Recent blog={blog} />
    </div>
  )
}

export default page