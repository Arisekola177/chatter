import Link from "next/link"
import { MdChat } from "react-icons/md"
import User from "./User";
import { getUser } from "../../../../actions/getUser";

const Navbar = async() => {
  const currentUser = await getUser()
  

  return (
    <div className="w-full border-b-[2px] border-orange-800 shadow-xl">
      <div className="w-10/12 mx-auto flex justify-between items-center py-4">

      <div className="flex items-center gap-1">
          <MdChat className="text-orange-800 cursor-pointer" />
          <Link className="text-2xl font-mono font-semibold " href='/'>Chatter</Link>
      </div>

      <div className="flex items-center">
        <input className="w-full py-1 px-5 hover:outline outline-orange-800 rounded-l-md placeholder:text-xs" type='text' placeholder="Enter a keyword" />
        <button className="py-2 px-3 bg-orange-800 text-white rounded-r-md text-sm hover:font-semibold">submit</button>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link className="hover:font-semibold hover:text-orange-800 hover:underline hover:underline-offset-4" href='/'>Home</Link>
        <Link className="hover:font-semibold hover:text-orange-800 hover:underline hover:underline-offset-4" href='/'>About</Link>
        <Link className="hover:font-semibold hover:text-orange-800 hover:underline hover:underline-offset-4" href='/'>Contact</Link>
        <User currentUser={currentUser} />
      </div>
       </div> 
    </div>
  )
}

export default Navbar