import axios from 'axios';

const NEWS_API_KEY = '535dab4ddcb54d92920c73ad30f0bdf6';

const getTrendingNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=${NEWS_API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching trending news:", error);
    return [];
  }
}

export default getTrendingNews;