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
      <hr
        style={{
          border: 0,
          borderTop: "1.5px solid #ddd",
          margin: "0 0 24px 0",
        }}
      />
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              marginBottom: 8,
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: "2px 10px",
              fontSize: 14,
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
                width: 220,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0, fontSize: 32 }}>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
          </h2>
          <p style={{ margin: "8px 0", fontWeight: 500 }}>
            <b>User Score:</b> {movie.vote_average}
          </p>
          <h3 style={{ marginBottom: 4, fontSize: 22 }}>Overview</h3>
          <p style={{ marginTop: 0, fontSize: 18 }}>{movie.overview}</p>
          <h3 style={{ marginBottom: 4, fontSize: 22 }}>Genres</h3>
          <p style={{ marginTop: 0, fontSize: 18 }}>
            {movie.genres.map((g) => g.name).join(" ")}
          </p>
        </div>
      </div>
      <hr
        style={{
          border: 0,
          borderTop: "1.5px solid #ddd",
          margin: "32px 0 16px 0",
        }}
      />
      <div>
        <h3 style={{ marginBottom: 8, fontSize: 22 }}>
          Additional information
        </h3>
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
