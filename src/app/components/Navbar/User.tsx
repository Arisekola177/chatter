'use client'
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaUser, FaUserCircle } from "react-icons/fa";

interface Blog {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    images: string;
  }
  
  interface User {
    createdAt: string | null;
    updatedAt: string | null;
    emailVerified: string | null;
    blogs: Blog[];
    email: string;
    id: string;
    image: string | null;
    name: string;
    hassPassword: string | null;
  }
  
  interface ProfileProps {
    currentUser: User | null;
  }

const User: React.FC<ProfileProps> = ({currentUser}) => {
  
  return (
    <>
    {
      currentUser ? (
     <div className="flex items-center gap-6 text-xs">
           <div className="flex items-center gap-2 ">
               <FaUserCircle />
            <p>{currentUser.email}</p>
           </div>
        <Link className="hover:font-bold hover:underline-offset-8 hover:underline duration-300 hover:text-white"  href='/create-post'>Create Post</Link>
        <div onClick={() => {
                 signOut()
               }} className="bg-red-900 text-white rounded-md py-2 px-4 hover:bg-red-950 hover:shadow-md">
        <Link href='/'>Sign Out</Link>
        </div>
     </div> ) : (      <div className="flex items-center gap-2 text-xs">
      <Link className="hover:font-bold hover:underline-offset-8 hover:underline duration-300 hover:text-white" href='/'>Home</Link>
      <Link className="hover:font-bold hover:underline-offset-8 hover:underline duration-300 hover:text-white" href='/'>About</Link>
      <Link className="hover:font-bold hover:underline-offset-8 hover:underline duration-300 hover:text-white" href='/'>Contact</Link>
      <div className="bg-red-900 text-white rounded-md py-2 px-4 hover:bg-red-950 hover:shadow-md">
      <Link href='/login'>Login/Register</Link>
      </div>
    </div>)
    }
     
        
    </>
  )
}

export default User