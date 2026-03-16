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
        maxWidth: 1100,
        margin: "0 auto",
        padding: 0,
        textAlign: "left",
      }}
    >
      <hr
        style={{
          border: 0,
          borderTop: "2px solid #e0e0e0",
          margin: "40px 0 32px 0",
        }}
      />
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
          padding: "0 40px",
        }}
      >
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
              marginBottom: 16,
              background: "#fff",
              border: "1.5px solid #bbb",
              borderRadius: 20,
              padding: "6px 18px",
              fontSize: 18,
              color: "#333",
              cursor: "pointer",
              zIndex: 2,
              fontWeight: 500,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            &larr; Go back
          </button>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: 270,
                borderRadius: 18,
                boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              }}
            />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              marginTop: 0,
              fontSize: 48,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
          </h2>
          <p
            style={{
              margin: "0 0 32px 0",
              fontWeight: 600,
              fontSize: 22,
              color: "#444",
            }}
          >
            <span style={{ fontWeight: 700 }}>User Score:</span>{" "}
            {movie.vote_average}
          </p>
          <h3 style={{ marginBottom: 8, fontSize: 30, fontWeight: 700 }}>
            Overview
          </h3>
          <p
            style={{
              marginTop: 0,
              fontSize: 22,
              color: "#555",
              marginBottom: 32,
            }}
          >
            {movie.overview}
          </p>
          <h3 style={{ marginBottom: 8, fontSize: 30, fontWeight: 700 }}>
            Genres
          </h3>
          <p style={{ marginTop: 0, fontSize: 22, color: "#555" }}>
            {movie.genres.map((g) => g.name).join(" ")}
          </p>
        </div>
      </div>
      <hr
        style={{
          border: 0,
          borderTop: "2px solid #e0e0e0",
          margin: "48px 0 24px 0",
        }}
      />
      <div style={{ padding: "0 40px 40px 40px" }}>
        <h3
          style={{
            marginBottom: 12,
            fontSize: 28,
            fontWeight: 700,
            color: "#6d6d7b",
          }}
        >
          Additional information
        </h3>
        <ul style={{ paddingLeft: 24, fontSize: 20 }}>
          <li style={{ marginBottom: 8 }}>
            <Link
              to="cast"
              style={{ color: "#4B2FC5", textDecoration: "underline" }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              style={{ color: "#4B2FC5", textDecoration: "underline" }}
            >
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
