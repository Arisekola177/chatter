import React from 'react'
import RegisterForm from './RegisterForm'
export const dynamic = 'force-dynamic';
const page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen xs:p-6 md:p-0">
        <RegisterForm />
    </div>
  )
}

export default page




