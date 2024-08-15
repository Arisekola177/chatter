import getBlogsByUserId from "../../../actions/getBlogsByUserId"
import { getUser } from "../../../actions/getUser"
import Recent from "./Recent"


const page = async () => {
    const currentUser = await getUser()
    const blog = await getBlogsByUserId(currentUser?.id)
  
  return (
    <div className="md:w-10/12 xs:w-11/12 mx-auto py-8">
       <Recent blog={blog} />
    </div>
  )
}

export default page