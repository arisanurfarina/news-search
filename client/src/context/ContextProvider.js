import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";

const UserContext = createContext();

function ContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [username, setUsername] = useState();

  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isError, setIsError] = useState(false);

  const [myFavourites, setMyFavourites] = useState([]);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
    setUsername(JSON.parse(localStorage.getItem("username")) || "");
    setMyFavourites(JSON.parse(localStorage.getItem("myFavourites")) || []);
  }, []); // Run only once on component mount

  const login = ({username, password, setErrorMessage}) => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setUsername(username);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", JSON.stringify(username));
    } else {
      setErrorMessage("Invalid credentials!");
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  }

  const searchNews = async ({searchTerm, page}) => {
    try {

      const URL = 'https://newsapi.org/v2/everything';
      const API = process.env.REACT_APP_NEWS_API_KEY;
      const query = `${URL}?apiKey=${API}&q=${searchTerm}&searchIn=title&sortBy=popularity&language=en&pageSize=20&page=${page}`;      
      const response =  await axios.get(query);

      const articles = response.data.articles;

      if (articles.length > 0) {
        setSearchResults(prev => [...prev, ...articles]);
        setIsError(false);
      } else {
        setIsError(true);
      }

      setIsLoading(false);

    } catch (error) {
      setIsError(true);
      console.error("Error fetching news:", error);
    }
  }

  const resetSearch = () => {
    setIsError(false);
    setSearchTerm("");
    setSearchResults([]);
  }

  const addToFavourites = (article) => {
    const isFave = myFavourites.some((item) => item.title === article.title);

    if (!isFave) {
      setMyFavourites([...myFavourites, article]);
      localStorage.setItem("myFavourites", JSON.stringify([...myFavourites, article]));
    }
  }

  const clearAllFavourites = () => {
    setMyFavourites([]);
    localStorage.setItem("myFavourites", JSON.stringify([]));
  }

  const value = {
    /*User Values*/
    username,
    myFavourites,
    addToFavourites,
    clearAllFavourites,
    /*Login Values*/
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
    /*Search News*/
    isLoading, setIsLoading,
    page, setPage,
    searchTerm, setSearchTerm,
    searchResults, setSearchResults,
    searchNews,
    resetSearch,

    isError
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

function useUserContext() {
  return useContext(UserContext);
}

export { ContextProvider, useUserContext };