import React from 'react';
import Image from "next/image";
import { FaComment } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";


interface Blog {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    reviews: any[];
}

interface ReviewProps {
    blog: Blog;
}

const Review: React.FC<ReviewProps> = ({ blog }) => {
  if (!blog.reviews || blog.reviews.length === 0) {
    return <div>No reviews yet.</div>;
  }

  return (
    <>
      {blog.reviews.map((review) => (
        <div className="flex flex-col gap-2" key={review.id}>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              src={review.user.image}
              width={20}
              height={20}
              alt={review.user.name}
            />
            <p className="font-semibold">{review.user.name}</p>
            <p>{review.user.email}</p>
          </div>
          <div className="py-2">
            <p className="text-sm text-justify">{review.comment}</p>
            <div className="flex items-center gap-4 py-2">
              <div className="font-semibold text-xs flex items-center gap-1 text-red-600">
                <FaComment />
                <span>1</span>
              </div>
              <div className="font-semibold text-xs flex items-center gap-1 text-red-600">
                <IoMdHeart />
                <span>1</span>
              </div>
            </div>
          </div>
          <p className="border-b-[2px] border-red-700" />
        </div>
      ))}
    </>
  );
};

export default Review;
