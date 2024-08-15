
'use client';
import { useEffect, useState } from 'react';
import getTrendingNews from '../../../actions/getTrendingNews';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const Trending: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      const trendingNews = await getTrendingNews();
      setArticles(trendingNews);
    };

    fetchTrendingNews();
  }, []);

  return (
    <div className="bg-slate-800 rounded-md shadow-md border-[1px] mt-5 border-slate-500">
      <h2 className='text-xl font-semibold text-center p-4 text-white'>Trending News</h2>
      {articles.map((article, index) => (
        <div key={index} className="p-4 border-[1px] border-slate-500 flex flex-col gap-2">
          <h2 className="xl:text-sm md:text-xs font-semibold text-white">{article.title}</h2>
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="rounded-md" />
          )}
          <a href={article.url} target="_blank" className="xl:text-sm md:text-xs hover:text-red-800 text-red-500 hover:underline hover:underline-offset-4">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default Trending;
