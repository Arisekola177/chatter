'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import axios from 'axios'
import { toast } from "react-toastify"
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from '../components/Input'

const RegisterForm = () => {
const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit, reset,  formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email: '',
      password: '',
    },
   
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast('Loading, please wait.....')
    setIsLoading(true)
    axios.post('/api/register', data)  
    .then(() => {
      toast.success('Account created');
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push('/')
          router.refresh()
          toast.success('Logged In')
        } else if (callback?.error) {
          toast.error(callback?.error)
        }
        setIsLoading(false)
      }).catch((error) => {
        toast.error('Login failed');
        console.error('Login error:', error);
      });
    }).catch((error) => {
      toast.error('Registration failed');
      console.error('Registration error:', error);
    }).finally(() => {
      setIsLoading(false)
      reset()
    });
  }
  

 

  return (
    <div className="">
    <div className="bg-slate-50 rounded-lg shadow-lg px-10 py-6">
      <h2 className="lg:text-2xl xs:text-sm font-bold text-red-700 text-center py-4">Sign Up For Chatter</h2>
      <div onClick={() => {}} className='w-[500px] py-2 rounded-md '>
       <button className='w-full py-2 outline-red-900 outline' >
          <span>sign up with Google</span> 
        </button>
      </div>
      <hr className='bg-slate-300 w-full mt-2  h-px' />
      
      
      <form  className="py-4 flex flex-col gap-2 w-[500px]">
          <Input id='name'
           label='Name' 
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
          <Input id='email'
           label='Email' 
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
            <Input id='password'
           label='Password' 
           disabled={isLoading}
           type='password'
           register={register}
           errors={errors}
           required
           />
             <Input id='confirmPassword'
           label='Confirm Password' 
           disabled={isLoading}
           type='password'
           register={register}
           errors={errors}
           required
           />
          <button className='bg-red-800 text-white py-2 ' onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading" : 'Sign Up'}
          </button>
      </form>
      <p className="text-center py-4 xs:text-[8px] sm:text-xs">Already have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/login'>Login</Link> here.</p>
    </div>
  </div>
  )
}

export default RegisterForm