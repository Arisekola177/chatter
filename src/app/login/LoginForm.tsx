
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import Input from '../components/Input'
import { toast } from "react-toastify"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from "react-icons/fc";
import LoadingButton from '../components/LoadingButton'
import { FaGithub } from 'react-icons/fa'

const LoginForm = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    toast('Loading, please wait.....')
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((response) => {
      if (response?.ok) {
        router.push('/')
        router.refresh()
        toast.success('Logged In')
        setIsLoading(false)
      }
      if (response?.error) {
        toast.error(response.error)
        setIsLoading(false)
      }
    })
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/' })
    setIsLoading(false)
  }

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    await signIn('github', { callbackUrl: '/' })
    setIsLoading(false)
   
  }

  return (
   
      <div className="md:w-[500px] xs:w-full mx-auto rounded-lg bg-white shadow-lg px-10 py-6">
        <h2 className="lg:text-2xl xs:text-sm font-bold text-center py-6">Welcome Back!</h2>
          <div onClick={handleGoogleSignIn} className='rounded-md border-[1px] xs:w-full md:w-[400px] mx-auto border-black'>
          <button  className='w-full flex items-center justify-center gap-4 py-2 '>
            <FcGoogle className='text-2xl' /> sign in with Google
          </button>
        </div>
        <div onClick={handleGithubSignIn} className='rounded-md border-[1px] xs:w-full md:w-[400px] mx-auto border-black mt-4'>
          <button  className='w-full flex items-center justify-center gap-4 py-2 '>
            <FaGithub className='text-2xl' /> sign in with Github
          </button>
        </div>
      
        <p className='w-full font-semibold mt-3 md:text-sm xs:text-xs text-center'>Or sign in with</p>
       

        <form className="py-4 flex flex-col mx-auto gap-2 xs:w-full md:w-[400px] ">
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
          <div className='w-full bg-slate-700 text-center hover:bg-slate-900 rounded-md shadow-md'>
          <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Login" />
          </div>
         
        </form>
        <p className="text-center py-4 xs:text-[8px] sm:text-xs">Don't have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/register'>Sign Up</Link> here.</p>
      </div>
 
  )
}

export default LoginForm
