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

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>

      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>

      <h3>Additional information</h3>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
