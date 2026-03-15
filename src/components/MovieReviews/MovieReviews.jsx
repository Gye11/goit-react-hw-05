import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";

function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const data = await getMovieReviews(movieId);
      setReviews(data);
    }

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews</p>;
  }

  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <p>{r.author}</p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
