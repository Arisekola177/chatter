'use client'
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import Post from '../recent-post/Post';
import { useRouter } from 'next/navigation';
import { User, Blog } from '@/lib/type';

interface UserProps {
  currentUser: User | null;
  blog: Blog[];
}

const Profile: React.FC<UserProps> = ({ currentUser, blog }) => {
  const router = useRouter();

  const edit = () => {
    router.push('/edit');
  };
  const profileImageSrc = currentUser?.image || "https://randomuser.me/api/portraits/men/1.jpg";

  return (
    <div className="xl:w-10/12 md:w-11/12 mx-auto grid xs:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 mt-10 gap-3">
      <div className="hidden md:flex col-span-1 flex-col gap-4 py-6 px-2">
        <div className="mb-4">
          <div className="relative md:w-16 md:h-16 xl:w-24 xl:h-24 cursor-pointer">
            <Image
              src={profileImageSrc}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mb-4 flex relative items-center text-white gap-1">
          <h2 className="font-normal text-sm">Name:</h2>
          <h2 className="font-normal text-sm">{currentUser?.name}</h2>
        </div>

        <div className="relative mb-4 flex items-center text-white gap-1">
          <h2 className="font-normal text-sm">Email:</h2>
          <h2 className="font-normal text-sm">{currentUser?.email}</h2>
        </div>

        <div className="relative mb-4 flex items-center text-white gap-1">
          <h2 className="font-normal text-sm">Joined:</h2>
          {currentUser?.createdAt && (
            <h2 className="font-normal text-sm">
              {formatDistanceToNow(new Date(currentUser.createdAt), { addSuffix: true })}
            </h2>
          )}
        </div>
        <div className="mt-5 bg-white rounded-md shadow-md w-32 hover:bg-slate-500 duration-300">
          <button
            onClick={edit}
            className="mx-auto py-2 px-4 hover:font-bold hover:text-white font-semibold"
          >
            Edit Image
          </button>
        </div>
      </div>
      <div className="xl:col-span-4 md:col-span-2 xs:p-2 md:p-4">
        <h2 className="text-center mb-4 text-white font-semibold text-xl">Recent Post</h2>
        <Post blog={blog} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Profile;
