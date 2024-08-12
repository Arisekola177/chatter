import Link from "next/link"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { MdChat, MdFacebook } from "react-icons/md"


const Footer = () => {
  return (
    <div className="w-full mt-20">
    <div className="w-10/12 mx-auto flex flex-col items-center justify-center p-4">
               <div className="flex items-center gap-4">
                  <MdFacebook className="text-2xl " />
                  <FaInstagram className="text-2xl " />
                  <FaTwitter className="text-2xl " />
                  <FaLinkedin  className="text-2xl "/>
              </div>
         
    
            <div className="flex w-full mt-10 justify-center items-center py-2 border-b-[2px] border-gray-800 gap-6">
             <Link className=" text-sm hover:font-bold hover:underline underline-offset-4 duration-300" href='/'>Home</Link>
             <Link  className=" text-sm hover:font-bold hover:underline underline-offset-4 duration-300" href='/about'>About</Link>
             <Link  className=" text-sm hover:font-bold hover:underline underline-offset-4 duration-300" href='/contact'>Contact</Link>
             <Link  className=" text-sm hover:font-bold hover:underline underline-offset-4 duration-300" href='/user'>Login/Register</Link>
            </div>
            <div className="py-6">© 2024 Chatter. All rights reserved</div> 
     </div>
    
    </div>
  )
}

export default Footer