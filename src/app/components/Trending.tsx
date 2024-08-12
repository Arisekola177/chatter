
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
    <div className="bg-orange-600 rounded-md shadow-md">
      {articles.map((article, index) => (
        <div key={index} className="p-4 flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-white">{article.title}</h2>
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="rounded-md" />
          )}
          <a href={article.url} target="_blank" className="text-sm hover:text-white hover:underline hover:underline-offset-4">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default Trending;
