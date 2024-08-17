
'use client';
import React, { useState } from 'react';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/lib/type';


interface UserProps {
  currentUser: User | null;
}

const UserProfile: React.FC<UserProps> = ({ currentUser }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [opencaret, setOpenCaret] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleCaret = () => {
    setOpenCaret(!opencaret);
  };

  const handleSignOut = async () => {
    toggleMenu();
    await signOut({ callbackUrl: '/' });
    localStorage.removeItem('hasShownWelcome');
    router.refresh();
  };

  return (
    <div className="relative z-30">
      <div
        onClick={() => {
          toggleMenu();
          toggleCaret();
        }}
        className="flex gap-1 items-center xs:p-1 sm:p-2 border-[1px] border-white rounded-full cursor-pointer hover:shadow-md duration-300 transition text-white"
      >
        {currentUser && currentUser.image ? (
       <Image src={currentUser.image || ''} alt={currentUser.name || ''} width={20} height={20} className='rounded-full' />
       ) : (
         <FaUserCircle />
        )}
        
        {opencaret ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>
      {open && (
        <div className="absolute rounded-md flex flex-col items-center bg-white shadow-md w-[170px] right-0 top-12 overflow-hidden text-sm text-black cursor-pointer">
          {currentUser ? (
            <div>
             
              <div className="px-4 py-3">
              <Link className='text-blue-500 text-xs' href="/profile">(Welcome {currentUser.name})</Link>
              </div>
              <div className="px-4 py-3">
                <Link href="/">Home</Link>
              </div>
              <div className="px-4 py-3">
                <Link href="/edit">Your Profile</Link>
              </div>
              <div className="px-4 py-3">
                <Link href="/recent-post">Your Previous Post</Link>
              </div>
              <hr />
              <div onClick={handleSignOut} className="px-4 py-3 cursor-pointer">
                LogOut
              </div>
            </div>
          ) : (
            <div>
              <div className="px-4 py-3">
                <Link href="/login">Login</Link>
              </div>
              <div className="px-4 py-3">
                <Link href="/register">Register</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

