import axios from 'axios';

const getTrendingNews = async () => {
  try {
    const response = await axios.get(`https://newsdata.io/api/1/latest?apikey=pub_512157bc90140475206acded6606042d9e4a6&q=pizza`);
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Error fetching trending news:", errorMessage);
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
}
export default getTrendingNews
