import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGVlZTVjNmU1YjI2ODg3M2Y3MTUxMGJiMzcxMjMyZSIsIm5iZiI6MTc3MzM1NzExMi45MDgsInN1YiI6IjY5YjM0ODM4YmRkZDNkNzY0MDRlMTJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7YKFZt4-cc4lG2G2lOnMjF5ZdyPGyvheqyxUe4z8PjM";

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

export const getMovieCast = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
  return res.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
  return res.data.results;
};
