import axios from "axios";

const TOKEN = "BURAYA_TOKEN";

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options,
  );
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
};
