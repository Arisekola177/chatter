
import Banner from "./components/Banner";
import Post from "./components/Post";
import {blogData} from '../constant/data'



export default function Home() {
 
  return (
    <main >
       <Banner />
       <Post blogData={blogData} />
    </main>
  );
}
