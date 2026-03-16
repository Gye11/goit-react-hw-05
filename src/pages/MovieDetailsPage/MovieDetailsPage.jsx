import { useEffect, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../services/api";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = location.state?.from ?? "/";

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovieDetails(movieId);
      setMovie(data);
    }
    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => window.history.back()}
            style={{
              position: "absolute",
              top: -12,
              left: -12,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: 13,
              color: "#333",
              cursor: "pointer",
              zIndex: 2,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            &larr; Go back
          </button>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: 200,
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          )}
        </div>
        <div>
          <h2 style={{ marginTop: 0 }}>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
          </h2>
          <p style={{ margin: "8px 0" }}>
            <b>User Score:</b> {movie.vote_average}
          </p>
          <h3 style={{ marginBottom: 4 }}>Overview</h3>
          <p style={{ marginTop: 0 }}>{movie.overview}</p>
          <h3 style={{ marginBottom: 4 }}>Genres</h3>
          <p style={{ marginTop: 0 }}>
            {movie.genres.map((g) => g.name).join(" ")}
          </p>
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <h3 style={{ marginBottom: 8 }}>Additional information</h3>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Link to="cast" style={{ color: "#4B2FC5" }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" style={{ color: "#4B2FC5" }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;
