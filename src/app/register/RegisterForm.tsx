
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import axios from 'axios'
import { toast } from "react-toastify"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Input from '../components/Input'
import { FcGoogle } from 'react-icons/fc'
import LoadingButton from '../components/LoadingButton'
import { FaEye, FaEyeSlash, FaGithub} from 'react-icons/fa'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const {register, handleSubmit, watch, reset, formState:{errors}} = useForm({
    resolver: zodResolver(FormSchema)
  })

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

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    await signIn('github', { callbackUrl: '/' })
    setIsLoading(false)
   
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl: '/' })
    setIsLoading(false)
  }


  return (
  
      <div className="md:w-[500px] xs:w-full mx-auto rounded-lg bg-white shadow-lg px-10 py-6">
        <h2 className="lg:text-2xl xs:text-sm font-bold text-black text-center py-4">Sign Up</h2>
        <div onClick={handleGoogleSignIn} className='rounded-md border-[1px] xs:w-full md:w-[400px] mx-auto border-black mt-4'>
          <button className='w-full flex items-center justify-center gap-4 py-2 '>
            <FcGoogle className='text-2xl' /> Continue with Google
          </button>
        </div>
        <div onClick={handleGithubSignIn} className='rounded-md border-[1px] xs:w-full md:w-[400px] mx-auto border-black mt-4'>
          <button  className='w-full flex items-center justify-center gap-4 py-2 '>
            <FaGithub className='text-2xl' /> sign in with Github
          </button>
        </div>
        
        <p className='w-full font-semibold mt-3 md:text-sm xs:text-xs text-center'>Or sign up with</p>
      

        <form className="py-4 flex flex-col mx-auto gap-2 xs:w-full md:w-[400px]">
        <div className={`relative col-span-2  ${errors?.name ? 'mb-6' : 'mb-0'}`}>
          <Input
            id='name'
            label='Name'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
                   {errors.name && (
                     <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                      {errors.name.message?.toString()}
                      </div>
                      )}
            </div>
          <div className={`relative col-span-2  ${errors?.email ? 'mb-6' : 'mb-0'}`}>
          <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
            {errors.email && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.email.message?.toString()}</div>
              )}
          </div>
           <div className={`relative col-span-2  ${errors?.password ? 'mb-6' : 'mb-0'}`}>
          <Input
            id='password'
            label='Password'
            disabled={isLoading}
            type={showPassword ? "text" : "password"}
            register={register}
            errors={errors}
            required
          />
          <FaEyeSlash 
                className={`absolute right-2 top-1/2 text-xs transform -translate-y-1/2 cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                onClick={() => setShowPassword(true)}
              />
              <FaEye 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'block' : 'hidden'}`}
                onClick={() => setShowPassword(false)}
              />
             {errors.password && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.password.message?.toString()}</div>
              )}
            </div>
          <div className={`relative col-span-2  ${errors?.confirmPassword? 'mb-6' : 'mb-0'}`}>
          <Input
            id='confirmPassword'
            label='Confirm Password'
            disabled={isLoading}
            type={showPassword ? "text" : "password"}
            register={register}
            errors={errors}
            required
          />
          <FaEyeSlash 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'hidden' : 'block'}`}
                onClick={() => setShowPassword(true)}
              />
              <FaEye 
                className={`absolute right-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'block' : 'hidden'}`}
                onClick={() => setShowPassword(false)}
              />
                {errors.confirmPassword && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.confirmPassword.message?.toString()}</div>
              )}
            </div>
            <div className='w-full bg-slate-700 text-center hover:bg-slate-900 rounded-md shadow-md'>
          <LoadingButton isLoading={isLoading} onClick={handleSubmit(onSubmit)} buttonText="Sign Up" />
           </div>
        </form>
        <p className="text-center py-4 text-sm ">Already have an account? <Link className="text-blue-500 hover:underline underline-offset-4" href='/login'>Login</Link> here.</p>
      </div>
   
  )
}

export default RegisterForm
