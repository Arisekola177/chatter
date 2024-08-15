import Link from "next/link"
import { MdChat } from "react-icons/md"
import User from "./User";
import { getUser } from "../../../../actions/getUser";
import SearchInput from "../SearchInput";

const Navbar = async() => {
  const currentUser = await getUser()
  

  return (
    <div className="w-full border-b-[2px] border-slate-800 shadow-xl">
      <div className="xl:w-10/12 md:full md:px-2 xl:px-0 xs:w-11/12 mx-auto flex justify-between items-center py-4">

      <div className="flex items-center gap-1">
          <MdChat className="text-white cursor-pointer" />
          <Link className="xl:text-2xl xs:text-lg text-white font-mono font-semibold " href='/'>Chatter</Link>
      </div>

      <div className="hidden md:flex items-center">
        <SearchInput />
      </div>

      <div className="">
        <User currentUser={currentUser} />
      </div>
       </div> 
    </div>
  )
}

export default Navbar