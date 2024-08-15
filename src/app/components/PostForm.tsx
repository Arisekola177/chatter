import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaBlogger } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref as firebaseRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/app/firebaseConfig';
import axios from 'axios';
import LoadingButton from './LoadingButton';

// Importing FroalaEditorComponent dynamically
const FroalaEditorComponent = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

// Define the Form Schema
const FormSchema = z.object({
  category: z.string().nonempty('Category is required.'),
  title: z.string().nonempty('Title is required.'),
});

const PostForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef<any>(null); // Use `any` for dynamic content

  const [model, setModel] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedModel = localStorage.getItem('savehtml') || '';
      setModel(savedModel);
    }
  }, []);

  const handleModelChange = (model: any) => {
    setModel(model);
  };

  const handleImageUpload = (files: FileList) => {
    if (files.length) {
      const file = files[0];
      uploadFileToFirebase(file)
        .then((url) => {
          editorRef.current?.editor?.image.insert(url, null, null, editorRef.current?.editor?.image.get(), null);
        })
        .catch((error) => {
          console.error('Image upload failed:', error);
        });
    }
    return false;
  };

  const handleVideoUpload = (files: FileList) => {
    if (files.length) {
      const file = files[0];
      uploadFileToFirebase(file)
        .then((url) => {
          editorRef.current?.editor?.video.insert(url, null, null, editorRef.current?.editor?.video.get(), null);
        })
        .catch((error) => {
          console.error('Video upload failed:', error);
        });
    }
    return false;
  };

  const uploadFileToFirebase = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = firebaseRef(storage, `uploads/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
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

  const addBlog = async (data: any) => {
    toast('Creating Post, please wait ....');
    setIsLoading(true);
    try {
      const blogData = {
        category: data.category,
        title: data.title,
        content: editorRef.current?.editor.html.get(),
      };
      await axios.post('/api/blog', blogData);
      setIsLoading(false);
      toast.success('Blog created successfully!');
      reset();
      setModel('');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Something went wrong while saving blog to the database', error);
      toast.error('Something went wrong while saving blog to the database');
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center gap-4'>
      <div className=''>
        <form className='flex flex-col py-4 gap-4' onSubmit={handleSubmit(addBlog)}>
          <div className='grid xs:grid-cols-1 md:grid-cols-2 gap-2'>
            <div className={`relative w-full ${errors?.category ? 'mb-6' : 'mb-0'}`}>
              <select {...register('category')}
                className='rounded-md py-3 w-full px-10 outline-none border-[1px] border-black focus:outline-slate-500'>
                <option value=''>Select a category</option>
                <option value='Technology'>Technology</option>
                <option value='Lifestyle'>Lifestyle</option>
                <option value='Education'>Education</option>
                <option value='Fashion'>Fashion</option>
                <option value='Sport'>Sport</option>
                <option value='Culture'>Culture</option>
                <option value='Travel'>Travel</option>
                <option value='Entertainment'>Entertainment</option>
              </select>
              <BiCategory className='absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer' />
              {errors.category && (
                <div className='absolute left-0 top-full mt-1 text-red-500 text-xs'>
                  {errors.category.message?.toString()}
                </div>
              )}
            </div>
            <div className={`relative w-full ${errors?.title ? 'mb-6' : 'mb-0'}`}>
              <input
                {...register('title')}
                type='text'
                placeholder='Blog Title'
                className='rounded-md py-3 w-full px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500'
              />
              <FaBlogger className='absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer' />
              {errors.title && (
                <div className='absolute left-0 top-full mt-1 text-red-500 text-xs'>
                  {errors.title.message?.toString()}
                </div>
              )}
            </div>
          </div>

          <FroalaEditorComponent
            tag='textarea'
            config={{
              imageUpload: true,
              videoUpload: true,
              events: {
                'image.beforeUpload': handleImageUpload,
                'video.beforeUpload': handleVideoUpload,
                'save.before': (html: string) => {
                  localStorage.setItem('savehtml', html);
                },
              },
            }}
            onModelChange={handleModelChange}
          />
          <div className='w-full flex items-center justify-end'>
            <div className='bg-slate-500 hover:bg-slate-800 rounded-md shadow-md w-32'>
              <LoadingButton isLoading={isLoading} onClick={handleSubmit(addBlog)} buttonText='Create Post' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
