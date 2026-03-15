import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrendingMovies();
      setMovies(data);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <h2 className="title">Trending today</h2>
      <MovieList movies={movies} />
    </>
  );
}

export default HomePage;
