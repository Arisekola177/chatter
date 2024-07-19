'use client'
import React, { useState } from 'react';
import { blogData } from '@/constant/data';
import Image from 'next/image';
import { FaComment } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/markdown.min.js';
import ReactPaginate from 'react-paginate';
import FroalaEditor from 'react-froala-wysiwyg';
import { z } from 'zod';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

const FormSchema = z.object({
  post: z.string().nonempty('Description is required.'),
});

const PostForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [model, setModel] = useState(() => {
    return localStorage.getItem('savehtml') || '';
  });

  const blogPerPage = 3;

  const offset = currentPage * blogPerPage;
  const currentProducts = blogData.slice(offset, offset + blogPerPage);
  const pageCount = Math.ceil(blogData.length / blogPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast('Loading, please wait...');
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
    reset();
  };

  return (
    <div className='w-8/12 mx-auto gap-4 py-8 grid grid-cols-2'>
      <div>
        <h2 className='text-lg font-semibold text-center'>Previous Post</h2>
        <p className='w-[90%] mx-auto py-2 border-b-[2px] border-red-700' />
        {currentProducts.map((blog) => (
          <div className='flex flex-col py-3 px-4' key={blog.id}>
            <div className='grid grid-cols-2 gap-2'>
              <Image src={blog.image} width={200} height={200} className='object-contain' alt={blog.title} />
              <div>
                <h3 className='text-sm font-medium text-purple-800'>{blog.category}</h3>
                <h2 className='text-sm py-2 font-semibold text-red-700'>{blog.title}</h2>
              </div>
            </div>
            <div className='flex flex-col py-4'>
              <p className='text-xs text-justify'>{blog.description.substring(0, 300)}.....</p>
              <div className='flex items-center mt-2 gap-2'>
                <div className='text-sm font-semibold'>Posted: 3 days ago by Azeez</div>
                <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><FaComment /><span>3</span></div>
                <div className='font-semibold text-xs flex items-center gap-1 text-red-600'><IoMdHeart /><span>3</span></div>
                <div onClick={() => router.push(`/blog/${blog.id}`)}
                  className='ml-4 border-b-[2px] border-red-700 cursor-pointer hover:font-semibold hover:text-red-900 text-sm text-red-700'>Read more</div>
              </div>
            </div>
            <p className='w-[98%] col-span-2 mx-auto py-2 border-b-[2px] border-red-700' />
          </div>
        ))}
      </div>

      <div>
        <h2 className='text-lg font-semibold text-center'>Add new Post</h2>
        <p className='w-[90%] mx-auto py-2 mb-2 border-b-[2px] border-red-700' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FroalaEditor
            tag='textarea'
            model={model}
            onModelChange={(e: string) => {
              setModel(e);
              setValue('post', e); // Update the form value with Froala's content
            }}
            config={{
              placeholderText: 'Start writing here...',
              saveInterval: 2000,
              pluginsEnabled: ['image', 'charCounter', 'save', 'markdown'],
              toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'indent', 'outdent', 'insertLink', 'insertImage', 'insertVideo', 'undo', 'redo', 'html'],
              events: {
                'save.before': function (html: string) {
                  localStorage.setItem('savehtml', html);
                },
                'initialized': function () {
                  // Initialize the editor with clean content
                  this.html.set('');
                },
              },
            }}
          />
          {errors.post && <p className='text-red-500'>{errors.post.message}</p>}
          <button className='w-full mx-auto mt-2 bg-red-900 text-white rounded-b-md py-2'>
            {isLoading ? 'Loading...' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center my-8">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'flex items-center p-0'}
          pageClassName={'mx-1'}
          pageLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          previousClassName={'mx-1'}
          previousLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          nextClassName={'mx-1'}
          nextLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          activeClassName={'bg-red-500 text-xs text-white rounded-full'}
        />
      </div>
    </div>
  );
};

export default PostForm;
