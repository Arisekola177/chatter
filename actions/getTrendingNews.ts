import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const getTrendingNews = async (): Promise<Article[]> => {

  try {
    const response = await axios.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=${NEWS_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching trending news:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
}

export default getTrendingNews;
