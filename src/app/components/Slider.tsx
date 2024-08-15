// 'use client'
// import React from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import AutoPlay from "embla-carousel-autoplay";
// import Image from 'next/image';
// import chatter from '../../../public/images/chatbox.jpg'

// export function Slider() {
//   const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

//   return (
//     <div className="overflow-hidden cursor-pointer relative" ref={emblaRef}>
//       <div className="flex">
//         <div className="relative flex-shrink-0 w-full h-[300px]">
//           <Image 
//             src={chatter} 
//             layout="fill" 
//             objectFit="cover" 
//             alt="chatter" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>
//         <div className="relative flex-shrink-0 w-full h-[300px]">
//           <Image 
//             src={chatter} 
//             layout="fill" 
//             objectFit="cover" 
//             alt="chatter" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>
//         <div className="relative flex-shrink-0 w-full h-[300px]">
//           <Image 
//             src={chatter} 
//             layout="fill" 
//             objectFit="cover" 
//             alt="chatter" 
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from "embla-carousel-autoplay";
import Image from 'next/image';
import chatter from '../../../public/images/chatbox.jpg';

export function Slider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="overflow-hidden cursor-pointer relative" ref={emblaRef}>
      <div className="flex">
        <div className="relative flex-shrink-0 w-full md:h-[300px] sm:h-[200px]">
          <Image 
            src={chatter} 
            layout="fill" 
            objectFit="cover" 
            alt="chatter" 
            className="w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex-shrink-0 w-full md:h-[300px] sm:h-[200px]">
          <Image 
            src={chatter} 
            layout="fill" 
            objectFit="cover" 
            alt="chatter" 
            className="w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex-shrink-0 w-full md:h-[300px] sm:h-[200px]">
          <Image 
            src={chatter} 
            layout="fill" 
            objectFit="cover" 
            alt="chatter" 
            className="w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
