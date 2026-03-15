import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
