
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
   
      <div className="rounded-lg shadow-lg px-10 py-6">
        <h2 className="lg:text-2xl xs:text-sm font-bold text-center py-6">Welcome Back!</h2>
          <div onClick={handleGoogleSignIn} className='rounded-md border-[1px] border-black'>
          <button  className='w-full flex items-center justify-center gap-4 py-2 '>
            <FcGoogle className='text-2xl' /> sign in with Google
          </button>
        </div>
        <div onClick={handleGithubSignIn} className='rounded-md border-[1px] border-black mt-4'>
          <button  className='w-full flex items-center justify-center gap-4 py-2 '>
            <FaGithub className='text-2xl' /> sign in with Github
          </button>
        </div>
        <div className=' grid grid-cols-3 items-center justify-center mt-4 gap-2'>
        <hr className='bg-slate-500 w-full mt-2 h-px col-span-1' />
        <p className='w-full items-center text-sm col-span-1'>Or sign in with</p>
        <hr className='bg-slate-500 w-full mt-2 h-px col-span-1' />
        </div>

        <form className="py-4 flex flex-col gap-2 w-[500px]">
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
          <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Login" />
        </form>
        <p className="text-center py-4 xs:text-[8px] sm:text-xs">Don't have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/register'>Sign Up</Link> here.</p>
      </div>
 
  )
}

export default LoginForm
