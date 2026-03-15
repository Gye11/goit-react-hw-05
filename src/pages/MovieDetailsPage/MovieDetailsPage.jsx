import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../services/api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>

      <div className="movieDetails">
        <img className="moviePoster" src={posterUrl} alt={movie.title} />

        <div>
          <h2>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h2>

          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>

          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Genres</h3>
          <p>{movie.genres.map((g) => g.name).join(" ")}</p>
        </div>
      </div>

      <div className="additional">
        <h3>Additional information</h3>

        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>

          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
