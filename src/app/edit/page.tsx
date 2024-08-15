import { getUser } from "../../../actions/getUser";
import EditProfile from "./EditProfile";

const page =async () => {
    const currentUser = await getUser();
  return (
    <div className="flex items-center justify-center h-screen">
          <EditProfile currentUser={currentUser} />  
    </div>
  )
}

export default page