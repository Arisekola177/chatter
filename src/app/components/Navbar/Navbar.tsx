import Link from "next/link"
import { MdChat } from "react-icons/md"
import User from "./User";
import { getUser } from "../../../../actions/getUser";




const Navbar = async() => {
  const currentUser = await getUser()
  

  return (
    <div className="w-8/12 mx-auto flex justify-between items-center py-4 bg-red-700 p-4 text-white">

      <div className="flex items-center gap-1">
          <MdChat />
          <Link className="text-lg" href='/'>Chatter</Link>
      </div>

      <div className="flex items-center">
        <input className="w-full py-1 px-5 rounded-l-md placeholder:text-xs" type='text' placeholder="Enter a keyword" />
        <button className="py-2 px-3 bg-red-900 text-white rounded-r-md text-sm hover:font-semibold">submit</button>
      </div>

      <div className="">
        <User currentUser={currentUser} />
      </div>
         
    </div>
  )
}

export default Navbar