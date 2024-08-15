import Image from "next/image"
import { Slider } from "./Slider"
import Blogcategory from "./Blogcategory"


const Banner = () => {
  return (
    <div className="w-full relative py-5 ">
     
   <div className="md:w-10/12 xs:w-full xs:h-full md:h-[300px] mx-auto relative">
     <Slider />
  </div>

<div className="w-full absolute top-1/2 transform -translate-y-1/2 flex justify-center">
      <div className="w-10/12 mx-auto text-white ">
         <div className="py-4 px-8 flex flex-col gap-4 text-center">
             <h2 className="font-bold xs:text-2xl md:text-6xl">Welcome to Chatter</h2>
             <h2 className="md:text-2xl xs:text-sm font-semibold">Your ultimate haven for all introverts.</h2>
             <div className="hidden md:flex items-center  justify-center gap-2 py-2 text-sm font-semibold">
                <Blogcategory />
             </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Banner