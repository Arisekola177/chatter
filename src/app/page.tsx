export const revalidate = 0;

import Post from "./components/Post";
import getBlogs from '../../actions/getBlogs'
import { getUser } from "../../actions/getUser";
import LoginForm from "./login/LoginForm";

interface SearchParams {
  category?: string;
  searchTerm?: string;
}

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({searchParams}: HomeProps ) {
  const blogData = await getBlogs(searchParams);
  const currentUser = await getUser()
   
  if (!currentUser) {
    return(
    <div className="flex items-center justify-center h-screen">
     <LoginForm/>
     </div> 
  )}
 
  return (
    <main className="overflow-hidden" >
       <Post blogData={blogData} currentUser={currentUser} />
        
    </main>
  );
}

