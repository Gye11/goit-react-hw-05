import { useState } from "react";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    const data = await searchMovies(query);
    setMovies(data);
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
        />

        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
