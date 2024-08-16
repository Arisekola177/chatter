// import React from 'react'
// import RegisterForm from './RegisterForm'

// const page = () => {
//   return (
//     <div className="w-8/12 h-screen mx-auto flex justify-center items-center">
//         <RegisterForm />
//     </div>
//   )
// }

// export default page

import React from 'react'
import RegisterForm from './RegisterForm'


export const getServerSideProps = async () => {
  return {
    props: {}, 
  }
}

const Page = () => {
  return (
    <div className="w-8/12 h-screen mx-auto flex justify-center items-center">
        <RegisterForm />
    </div>
  )
}

export default Page
