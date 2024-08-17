import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import 'react-quill/dist/quill.snow.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']                                         
    ],
  }
};

const FormSchema = z.object({
  category: z.string().nonempty('Category is required.'),
  title: z.string().nonempty('Title is required.'),
  description: z.string().nonempty('Description is required.'),
});

type FormData = z.infer<typeof FormSchema>;

const PostForm: React.FC = () => {


  const {register, handleSubmit, setValue, reset, watch, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(FormSchema)
  });

  

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const category = watch('category');
  const description = watch('description');

const processAndUploadContent = async (htmlContent: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const images = doc.querySelectorAll('img');
  const videos = doc.querySelectorAll('video');

  const imageArray = Array.from(images);
  for (const img of imageArray) {
    const src = img.getAttribute('src');
    if (src) {
      const file = await fetch(src).then((r) => r.blob());
      const fileName = `image-${Date.now()}`;
      const storageRef = ref(storage, `posts/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      const downloadURL = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          () => {
          },
          (error) => {
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
      img.setAttribute('src', downloadURL);
    }
  }



const videoArray = Array.from(videos);

for (const video of videoArray) {
  const src = video.getAttribute('src');
  if (src) {
    const file = await fetch(src).then((r) => r.blob());
    const fileName = `video-${Date.now()}`;
    const storageRef = ref(storage, `posts/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    const downloadURL = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {
        },
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
    video.setAttribute('src', downloadURL);
  }
}


  return doc.body.innerHTML;
};

type FormData = {
  category: string;
  title: string;
  description: string;
};

const handlePost: SubmitHandler<FormData> = async (data: FormData) => {
  toast('Creating Post, please wait......')
  setIsLoading(true)
  try {
    const processedDescription = await processAndUploadContent(data.description);
    data.description = processedDescription;

    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/')
    router.refresh()
    reset()
  } catch (error) {
    console.error("Error processing content: ", error);
    toast.error("Failed to process content");
    setIsLoading(false)
  } finally {
    setIsLoading(false)
    toast.success('Post Created Sucessfully')
  }
};


  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='w-full'>
        <form onSubmit={handleSubmit(handlePost)} className="py-4 flex flex-col gap-2 w-full">
          <div className='grid grid-cols-2 gap-4'>
            <div className={`relative col-span-1 ${errors?.title ? 'mb-6' : 'mb-0'}`}>
              <Input
                id='title'
                disabled={false}
                {...register('title')}
                placeholder='Title'
                required
              />
              {errors.title && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.title.message?.toString()}
                </div>
              )}
            </div>

            <div className={`relative col-span-1 ${errors?.category ? 'mb-6' : 'mb-0'}`}>
              <Select
                onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.category.message?.toString()}
                </div>
              )}
            </div>
          </div>

          <div className={`relative col-span-2 ${errors?.description ? 'mb-6' : 'mb-0'}`}>
          <ReactQuill 
  theme="snow" 
  value={description} 
  onChange={(content) => setValue('description', content, { shouldValidate: true })} 
  modules={modules} 
  className="bg-white"
/>
            {errors.description && (
              <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                {errors.description.message?.toString()}
              </div>
            )}
          </div>
           <div className='w-full flex justify-end '>
           <div className='w-32 py-2 px-4 text-white text-sm bg-slate-700 text-center hover:bg-slate-900 rounded-md shadow-md'>
            <button type="submit">
               {isLoading ? 'Creating.... ' : 'Create Post'}
            </button>
          </div>
           </div>
        
        </form>
      </div>
    </div>
  );
};

export default PostForm;
