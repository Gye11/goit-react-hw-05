import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";

function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError("Oyuncu bilgileri yüklenirken hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {cast.map((actor) => (
        <li key={actor.id} style={{ textAlign: "center", width: "150px" }}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            style={{
              width: "100px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <p style={{ margin: "5px 0", fontSize: "14px" }}>{actor.name}</p>
          {actor.character && (
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
              Rol: {actor.character}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
