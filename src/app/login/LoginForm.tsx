'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../components/Input'
import { toast } from "react-toastify"
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {


  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({
    defaultValues:{
      email: '',
      password: '',
    }
  });


  const onSubmit:SubmitHandler<FieldValues>=(data) => {
    toast('Loading, please wait.....')
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((response)=> {
      if(response?.ok){
        router.push('/')
        router.refresh()
        toast.success('Logged In')
        setIsLoading(false)
      }
      if(response?.error){
        toast.error(response.error)
        setIsLoading(false) 
      }
    })
  }

  return (
    <div className="">
    <div className="bg-slate-50 rounded-lg shadow-lg px-10 py-6">
      <h2 className="lg:text-2xl xs:text-sm font-bold text-red-700 text-center py-4">Login</h2>
      <div onClick={() => {}} className='w-[500px] py-2 rounded-md '>
       <button className='w-full py-2 outline-red-900 outline' >
          <span>continue with Google</span> 
        </button>
      </div>
      <hr className='bg-slate-300  mt-2 w-full h-px' />
     
      
      <form  className="py-4 flex flex-col gap-2 w-[500px]">
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
          <button className='bg-red-800 text-white py-2 ' onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading" : 'Sign Up'}
          </button>
      </form>
      <p className="text-center py-4 xs:text-[8px] sm:text-xs">Don't have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/register'>Sign Up</Link> here.</p>
    </div>
  </div>
  )
}

export default LoginForm