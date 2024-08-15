'use client'

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import LoadingButton from "../components/LoadingButton";
import Image from "next/image";
import icon from '../../../public/images/imageicon.png';

interface User {
    id: string;
    name: string;
    image: string;
    createdAt: string;
    email: string;
}
interface UserProps {
    currentUser: User | null;
 }
const EditProfile: React.FC<UserProps> = ({currentUser}) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(currentUser?.image || '');
    const [isLoading, setIsLoading] = useState(false);

    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadFileToFirebase = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, `uploads/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleEdit = async () => {
    if (!currentUser?.id) return;

    setIsLoading(true);
    toast("Updating, Please wait..... ");

    if (selectedImage) {
      try {
        const imageURL = await uploadFileToFirebase(selectedImage);
        await updateUserProfile({ userId: currentUser.id, image: imageURL });
        setImagePreview(imageURL);
        toast.success('Profile picture updated successfully!');
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast.error('Failed to update profile picture.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('No image selected.');
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updateData: { userId: string; image: string }) => {
    try {
      const response = await fetch('/api/updateUserProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      const result = await response.json();
      console.log('User profile updated:', result);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  return (
    <div className="w-[400px] bg-white shadow-md rounded-lg">
        <div className='flex items-center justify-center flex-col py-6 px-2'>
        <h2 className="text-xl font-normal mb-4">Profile</h2>
        <div className="mb-4">
          <div className="relative w-24 h-24 cursor-pointer">
            <Image
              src={imagePreview || icon}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="mb-4 flex relative items-center gap-1">
          <h2 className='font-normal text-sm'>Name:</h2>
          <h2 className='font-normal text-sm'>{currentUser?.name}</h2>
        </div>

        <div className="relative mb-4 flex items-center gap-1">
          <h2 className='font-normal text-sm'>Email:</h2>
          <h2 className='font-normal text-sm'>{currentUser?.email}</h2>
        </div>
         
        <div className="relative mb-4 flex items-center  gap-1">
          <h2 className='font-normal text-sm'>Joined:</h2>
          {currentUser?.createdAt && (
            <h2 className='font-normal text-sm'>
              {formatDistanceToNow(new Date(currentUser.createdAt), { addSuffix: true })}
            </h2>
          )}
        </div>
        <div className='mt-5 bg-slate-500 text-white hover:bg-slate-800 duration-300 rounded-md shadow-md'>
          <LoadingButton isLoading={isLoading} buttonText="Change Picture" onClick={handleEdit} />
        </div>
      </div>
    </div>
  )
}

export default EditProfile