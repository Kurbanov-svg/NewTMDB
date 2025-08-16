import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DetalVidios.module.css";

export interface MovieType {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
}

interface DetalVidiosProps {
  movies: MovieType[];
  loading: boolean;
}

const DetalVidios: React.FC<DetalVidiosProps> = ({ movies, loading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0.5;
    let animationFrameId: number;

    const smoothScroll = () => {
      scrollContainer.scrollLeft += scrollAmount;

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Загрузка...</p>;
  if (!movies.length) return null;

  return (
    <div className={styles.similarContainer}>
      <h2 className={styles.title}>Смотрите также</h2>
      <div ref={scrollRef} className={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={styles.card}
            onClick={() => navigate(`/movie/${movie.id}`)}
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
