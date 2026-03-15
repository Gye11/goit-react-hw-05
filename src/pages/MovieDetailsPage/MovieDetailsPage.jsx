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
    <>
      <Link to={backLink}>Go back</Link>

      <h2>{movie.title}</h2>

      <p>User Score: {movie.vote_average}</p>

      <h3>Overview</h3>
      <p>{movie.overview}</p>

      <h3>Genres</h3>
      <p>{movie.genres.map((g) => g.name).join(" ")}</p>

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
    </>
  );
}

export default MovieDetailsPage;
