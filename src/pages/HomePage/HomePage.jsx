import { useEffect, useState } from "react";
import { getTrending } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrending();
      setMovies(data);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
    </>
  );
}

export default HomePage;
