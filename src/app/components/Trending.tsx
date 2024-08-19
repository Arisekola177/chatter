// // 'use client';
// // import { useEffect, useState } from 'react';
// // import getTrendingNews from '../../../actions/getTrendingNews';

// // interface Article {
// //   title: string;
// //   description: string;
// //   link: string;
// //   image_url: string;
// // }

// // const Trending: React.FC = () => {
// //   const [articles, setArticles] = useState<Article[]>([]);

// //   useEffect(() => {
// //     const fetchTrendingNews = async () => {
// //       const trendingNews = await getTrendingNews();
// //       setArticles(trendingNews);
// //     };

// //     fetchTrendingNews();
// //   }, []);

// //   const articlesToShow = articles.slice(0, 5);

// //   return (
// //     <div className="bg-slate-800 rounded-md shadow-md border-[1px] mt-5 border-slate-500">
// //       <h2 className="text-xl font-semibold text-center p-4 text-white">Trending News</h2>
// //       {articlesToShow.map((article, index) => (
// //         <div key={index} className="p-4 border-[1px] border-slate-500 flex flex-col gap-2">
// //           <h2 className="xl:text-sm md:text-xs font-semibold text-white">{article.title}</h2>
// //           {article.image_url && (
// //             <img src={article.image_url} alt={article.title} className="rounded-md" />
// //           )}
// //           <a
// //             href={article.link}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="xl:text-sm md:text-xs hover:text-red-800 text-red-500 hover:underline hover:underline-offset-4"
// //           >
// //             Read more
// //           </a>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Trending;


// 'use client';
// import { useEffect, useState } from 'react';
// import getTrendingNews from '../../../actions/getTrendingNews';

// interface Article {
//   title: string;
//   description: string;
//   link: string;
//   image_url: string;
// }

// // Function to shuffle an array
// const shuffleArray = <T,>(array: T[]): T[] => {
//   let currentIndex = array.length;
//   let randomIndex: number;

//   // While there remain elements to shuffle...
//   while (currentIndex !== 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const Trending: React.FC = () => {
//   const [articles, setArticles] = useState<Article[]>([]);

//   useEffect(() => {
//     const fetchTrendingNews = async () => {
//       const trendingNews = await getTrendingNews();
//       const shuffledArticles = shuffleArray(trendingNews); 
//       setArticles(shuffledArticles);
//     };

//     fetchTrendingNews();
//   }, []);

//   const articlesToShow = articles.slice(0, 5);

//   return (
//     <div className="bg-slate-800 rounded-md shadow-md border-[1px] mt-5 border-slate-500">
//       <h2 className="text-xl font-semibold text-center p-4 text-white">Trending News</h2>
//       {articlesToShow.map((article, index) => (
//         <div key={index} className="p-4 border-[1px] border-slate-500 flex flex-col gap-2">
//           <h2 className="xl:text-sm md:text-xs font-semibold text-white">{article.title}</h2>
//           {article.image_url && (
//             <img src={article.image_url} alt={article.title} className="rounded-md" />
//           )}
//           <a
//             href={article.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="xl:text-sm md:text-xs hover:text-red-800 text-red-500 hover:underline hover:underline-offset-4"
//           >
//             Read more
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Trending;
'use client';
import { useEffect, useState } from 'react';
import getTrendingNews from '../../../actions/getTrendingNews';

interface Article {
  title: string;
  description: string;
  link: string;
  image_url: string;
}

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Trending: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      const trendingNews = await getTrendingNews() as Article[]; // Explicitly cast to Article[]
      const shuffledArticles = shuffleArray(trendingNews);
      setArticles(shuffledArticles);
    };

    fetchTrendingNews();
  }, []);

  const articlesToShow = articles.slice(0, 5);

  return (
    <div className="bg-slate-800 rounded-md shadow-md border-[1px] mt-5 border-slate-500">
      <h2 className="text-xl font-semibold text-center p-4 text-white">Trending News</h2>
      {articlesToShow.map((article, index) => (
        <div key={index} className="p-4 border-[1px] border-slate-500 flex flex-col gap-2">
          <h2 className="xl:text-sm md:text-xs font-semibold text-white">{article.title}</h2>
          {article.image_url && (
            <img src={article.image_url} alt={article.title} className="rounded-md" />
          )}
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="xl:text-sm md:text-xs hover:text-red-800 text-red-500 hover:underline hover:underline-offset-4"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default Trending;

