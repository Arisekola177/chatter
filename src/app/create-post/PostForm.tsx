'use client'
import React, { useRef, useState } from 'react';
import { FaBlogger } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/firebaseConfig';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';


const FormSchema = z.object({
  category: z.string().nonempty('Category is required.'),
  title: z.string().nonempty('Title is required.')
});


const PostForm = () => {
  const { register, handleSubmit,  reset, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(() => {
    return localStorage.getItem('savehtml') || '';
  });

  const editorRef = useRef(null);

  const handleModelChange = (model) => {
    setModel(model);
  };

  const handleImageUpload = (files: FileList) => {
    if (files.length) {
      const file = files[0];
      uploadFileToFirebase(file)
        .then((url) => {
          editorRef.current.editor.image.insert(url, null, null, editorRef.current.editor.image.get(), null);
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    }
    return false;
  };

  const handleVideoUpload = (files: FileList) => {
    if (files.length) {
      const file = files[0];
      uploadFileToFirebase(file)
        .then((url) => {
          editorRef.current.editor.video.insert(url, null, null, editorRef.current.editor.video.get(), null);
        })
        .catch((error) => {
          console.error("Video upload failed:", error);
        });
    }
    return false;
  };

  const uploadFileToFirebase = async (file: File) => {
    return new Promise((resolve, reject) => {
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

  const addBlog = async (data: any) => {
    toast("Creating Post, please wait ....");
    setIsLoading(true);
    try {
      const blogData = {
        category: data.category,
        title: data.title,
        content: editorRef.current.editor.html.get(),
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
    <div className='w-10/12 mx-auto flex items-center justify-center gap-4 py-8'>
      <div className='w-[600px] mx-auto'>
        <h2 className='text-lg font-semibold text-orange-800 text-center'>Add New Post</h2>
        <p className='w-full mx-auto py-2 mb-2 border-b-[2px] border-gray-700' />
        <form className='flex flex-col py-4 gap-4' onSubmit={handleSubmit(addBlog)}>
          <div className={`relative w-full ${errors.category ? 'mb-6' : 'mb-0'}`}>
            <input
              {...register("category")}
              type="text"
              placeholder="Blog Category"
              className="rounded-md py-3 w-full px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
            />
            <BiCategory className="absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer" />
            {errors.category && (
              <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                {errors.category.message}
              </div>
            )}
          </div>
          <div className={`relative w-full ${errors.title ? 'mb-6' : 'mb-0'}`}>
            <input
              {...register("title")}
              type="text"
              placeholder="Blog Title"
              className="rounded-md py-3 w-full px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
            />
            <FaBlogger className="absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer" />
            {errors.title && (
              <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                {errors.title.message}
              </div>
            )}
          </div>

          <FroalaEditorComponent
            ref={editorRef}
            tag='textarea'
            config={{
              imageUpload: true,
              videoUpload: true,
              events: {
                'image.beforeUpload': (files: FileList) => handleImageUpload(files),
                'video.beforeUpload': (files: FileList) => handleVideoUpload(files),
                'save.before': function (html: string) {
                  localStorage.setItem('savehtml', html);
                },
              },
            }}
            onModelChange={handleModelChange}
          />

         <LoadingButton isLoading={isLoading} onClick={handleSubmit(addBlog)} buttonText="Create Post" />

        </form>
      </div>
    </div>
  );
};

export default PostForm;
