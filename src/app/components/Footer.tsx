import Link from "next/link"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import {  MdFacebook } from "react-icons/md"


const Footer = () => {
  return (
    <div className="w-full border-t-[2px] border-slate-600 shadow-xl mt-20">
    <div className="w-10/12 mx-auto flex flex-col items-center justify-center p-4">
               <div className="flex items-center gap-4 text-white">
                  <MdFacebook className="text-2xl " />
                  <FaInstagram className="text-2xl " />
                  <FaTwitter className="text-2xl " />
                  <FaLinkedin  className="text-2xl "/>
              </div>
         
            <div className="py-6 text-sm text-white">© 2024 Chatter. All rights reserved</div> 
     </div>
    
    </div>
  )
}

export default Footer