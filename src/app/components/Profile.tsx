'use client'
import Link from "next/link";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { MdHome, MdSearch, MdMessage, MdPostAdd } from "react-icons/md";

const Profile = () => {
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
      <div className="flex items-center gap-2 text-white hover:bg-slate-500 hover:rounded-md hover:shadow-md py-2 w-40 px-6 cursor-pointer">
        <MdHome />
        <p className="xl:font-bold md:font-semibold">Home</p>
      </div>
      </Link>
      <div className="flex items-center gap-2 text-white hover:bg-slate-500 hover:rounded-md hover:shadow-md py-2 w-40 px-6 cursor-pointer">
        <MdSearch />
        <p className="xl:font-bold md:font-semibold">Explore</p>
      </div>
      <Link href="/profile">
        <div className="flex items-center gap-2 text-white hover:bg-slate-500 hover:rounded-md hover:shadow-md py-2 w-40 px-6 cursor-pointer">
          <FaUserAlt />
          <p className="xl:font-bold md:font-semibold">Profile</p>
        </div>
      </Link>
      <Link href='/'>
      <div className="flex items-center gap-2 text-white hover:bg-slate-500 hover:rounded-md hover:shadow-md py-2 w-40 px-6 cursor-pointer">
        <FaBell />
        <p className="xl:font-bold md:font-semibold">Notification</p>
      </div>
      </Link>
     
    <Link href='/recent-post'>
      <div className="flex items-center gap-2 text-white hover:bg-slate-500 hover:rounded-md hover:shadow-md py-2 w-40 px-6 cursor-pointer">
        <MdPostAdd />
        <p className="xl:font-bold md:font-semibold">Post</p>
      </div>
      </Link>
    </div>
  );
};

export default Profile;
