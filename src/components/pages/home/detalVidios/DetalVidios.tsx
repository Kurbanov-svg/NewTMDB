import { useEffect, useRef } from "react";
import styles from "./DetalVidios.module.css";
import { useNavigate } from "react-router-dom";

const DetalVidios = ({ movies, loading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0.5;
    let animationFrameId: number;

    const smoothScroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollAmount;

        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Загрузка...</p>;
  if (!movies?.length) return null;

  return (
    <div className={styles.similarContainer}>
      <h2 className={styles.title}>Смотрите также</h2>
      <div ref={scrollRef} className={styles.grid}>
        {movies.map((movie) => (
          <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            key={movie.id}
            className={styles.card}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              className={styles.image}
            />
            <p className={styles.name}>{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalVidios;
