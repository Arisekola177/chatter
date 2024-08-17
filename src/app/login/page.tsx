export const dynamic = 'force-dynamic';
import LoginForm from "./LoginForm"
const page = async () => {
 
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen  xs:p-6 md:p-0 ">
         <LoginForm  />
    </div>
  )
}

export default page