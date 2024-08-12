import Image from "next/image"
import { Slider } from "./Slider"


const Banner = () => {
  return (
    <div className="w-full relative py-5 ">
     
   <div className="w-10/12 h-[300px] mx-auto relative">
     <Slider />
  </div>

<div className="w-full absolute top-1/2 transform -translate-y-1/2 flex justify-center">
      <div className="w-10/12 mx-auto text-white ">
         <div className="py-4 px-8 flex flex-col gap-4 text-center">
             <h2 className="font-bold text-6xl">Welcome to Chatter</h2>
             <h2 className="text-2xl font-semibold">Your ultimate haven for all introverts.</h2>
             <div className="flex items-center  justify-center gap-2 py-2 text-sm font-semibold">
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Travel</p>
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Lifestyle</p>
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Entertainment</p>
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Technology</p>
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Education</p>
                <p className="hover:text-orange-800 hover:font-semibold hover:underline hover:underline-offset-4 duration-300">Fashion</p>
             </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Banner