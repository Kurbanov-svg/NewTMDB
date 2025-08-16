import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./ActorBio.module.css";
import { useGetActorBioQuery } from "../../../../api/ActorBio";

const ActorBio = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const actorId = Number(id);
  const [category, setCategory] = useState<
    "actor" | "director" | "writer" | "producer" | "other"
  >("actor");

  const { data, isLoading, isError, error } = useGetActorBioQuery(actorId);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка: {error.message}</p>;
  if (!data) return <p>Нет данных</p>;

  const actorImage = data.profile_path
    ? `https://image.tmdb.org/t/p/w300${data.profile_path}`
    : "/placeholder.png";

  const cast = data.movie_credits?.cast || [];
  const crew = data.movie_credits?.crew || [];
  if (cast.length === 0 && crew.length === 0) {
    return <p>Нет фильмографии для этого актёра</p>;
  }

  const movies =
    category === "actor"
      ? cast
      : crew.filter((job) => {
          if (category === "director") return job.job === "Director";
          if (category === "writer")
            return job.job === "Screenplay" || job.job === "Writer";
          if (category === "producer") return job.job === "Producer";
          if (category === "other")
            return !["Director", "Screenplay", "Writer", "Producer"].includes(
              job.job ?? ""
            );
          return false;
        });

  return (
    <div className={styles.actorBio}>
      <div className={styles.header}>
        <img src={actorImage} alt={data.name} className={styles.actorImage} />
        <div>
          <h1>{data.name}</h1>
          <p className={styles.subtitle}>Фильмография</p>
        </div>
      </div>

      <div className={styles.categories}>
        <button
          className={category === "actor" ? styles.active : ""}
          onClick={() => setCategory("actor")}
        >
          Актёр {data.movie_credits?.cast.length}
        </button>
        <button
          className={category === "director" ? styles.active : ""}
          onClick={() => setCategory("director")}
        >
          Режиссёр
        </button>
        <button
          className={category === "writer" ? styles.active : ""}
          onClick={() => setCategory("writer")}
        >
          Сценарист
        </button>
        <button
          className={category === "producer" ? styles.active : ""}
          onClick={() => setCategory("producer")}
        >
          Продюсер
        </button>
        <button
          className={category === "other" ? styles.active : ""}
          onClick={() => setCategory("other")}
        >
          Прочее
        </button>
      </div>

      <div className={styles.movies}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={styles.actorCard}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.title || movie.name}
              className={styles.actorImage}
            />
            <div className={styles.actorName}>{movie.title || movie.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorBio;
