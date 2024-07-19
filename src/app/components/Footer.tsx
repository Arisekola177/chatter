import Link from "next/link"
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { MdChat, MdFacebook } from "react-icons/md"


const Footer = () => {
  return (
    <div className="w-8/12 mx-auto flex flex-row items-center justify-between py-4 text-white bg-red-700 p-4">
        <div>
          <div className="flex items-center gap-1">
            <MdChat />
            <Link className="text-lg" href='/'>Chatter</Link>
            </div>
            <div className="flex flex-col gap-2">
                <h2>Follow us on our socials</h2>
                <div className="flex flex-col gap-1">
                  <MdFacebook />
                  <FaInstagram />
                  <FaTwitter />
                  <FaLinkedin />
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-3">
             <h2>Useful links</h2>
             <Link className=" text-xs hover:font-bold hover:underline underline-offset-4 duration-300" href='/'>Home</Link>
             <Link  className=" text-xs hover:font-bold hover:underline underline-offset-4 duration-300" href='/about'>About</Link>
             <Link  className=" text-xs hover:font-bold hover:underline underline-offset-4 duration-300" href='/contact'>Contact</Link>
             <Link  className=" text-xs hover:font-bold hover:underline underline-offset-4 duration-300" href='/user'>Login/Register</Link>
        </div>
    </div>
  )
}

export default Footer