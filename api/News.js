import axios from "axios";

async function newsHandler(req, res) {
  const { searchTerm, newPage } = req.query;

  //REACT_APP_NEWS_API_KEY

  const URL = 'https://newsapi.org/v2/everything';
  const API = process.env.REACT_APP_NEWS_API_KEY;
  const query = `${URL}?apiKey=${API}&q=${encodeURIComponent(searchTerm)}&searchIn=title&sortBy=popularity&language=en&pageSize=20&page=${newPage}`;

  try {
    const response = await axios.get(query);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default newsHandler;