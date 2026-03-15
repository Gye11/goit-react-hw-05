import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";

function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      const data = await getMovieCast(movieId);
      setCast(data);
    }

    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
}

export default MovieCast;
