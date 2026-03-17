import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../services/api";

function NotFoundPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getTrendingMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>
        Aradığınız sayfa bulunamadı. Trending filmleri görüntüleyebilirsiniz:
      </p>
      <MovieList movies={movies} />
    </div>
  );
}

export default NotFoundPage;
