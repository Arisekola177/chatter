
import { getUser } from "../../../actions/getUser"
import Nulldata from "../components/Nulldata"
import PostForm from "./PostForm"

const page = async() => {
  const currentUser = await getUser()

  if(!currentUser){
    return  <Nulldata title='Oops! Access denied' />
  }
  return (
    <div className="">
         <PostForm   />
    </div>
  )
}

export default page