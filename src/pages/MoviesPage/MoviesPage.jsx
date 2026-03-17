import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      return;
    }
    const data = await searchMovies(searchQuery);
    setMovies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    setSearchParams({ query });
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <style>{`
        .search-form {
          margin: 18px 0 20px 0;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 320px;
          font-size: 16px;
          border: 2px solid #bbb;
          border-radius: 4px;
          padding: 4px 8px;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: #3399ff;
          outline: none;
        }
        .search-btn {
          margin-left: 4px;
          padding: 4px 16px;
          font-size: 16px;
          border: 1px solid #bbb;
          border-radius: 4px;
          background: #f5f5f5;
          color: #222;
          cursor: pointer;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
