export const revalidate = 0;
import Banner from "./components/Banner";
import Post from "./components/Post";
import getBlogs from '../../actions/getBlogs'
import Nulldata from "./components/Nulldata";
import { getUser } from "../../actions/getUser";


export default async function Home({ searchParams }) {
  const blogData = await getBlogs(searchParams);
  const currentUser = await getUser()
   
  if (blogData.length === 0) {
    return <Nulldata title="Oops! No Blog found. " />;
  }
  return (
    <main >
       <Banner />
       <Post blogData={blogData} currentUser={currentUser} />
    </main>
  );
}
