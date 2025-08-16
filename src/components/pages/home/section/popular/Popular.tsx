import { useNavigate } from "react-router-dom";
import { useGetTrendingQuery } from "../../../../../api/popular";
import styles from "./popular.module.css";
import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const Popular = () => {
  const [sortHighToLow, setSortHighToLow] = useState(true);
  const [timeFilter, setTimeFilter] = useState<"day" | "week">("day");
  const navigate = useNavigate();
  const { data: populargData, isLoading, error } = useGetTrendingQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  const sortedMovies = [...(populargData?.results || [])].sort((a, b) =>
    sortHighToLow
      ? b.vote_average - a.vote_average
      : a.vote_average - b.vote_average
  );

  return (
    <div className={styles.trendingSection}>
      <div className={styles.trendingHeader}>
        <div className={styles.headerLeft}>
          <h2>What's Popular</h2>
          <p className={styles.discoverText}>Most loved content by audiences</p>
        </div>
        <div className={styles.filterBar}>
          <div className={styles.sortToggle}>
            <span className={styles.star}>⭐</span>
            <span>Высокий → Низкий</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={sortHighToLow}
                onChange={() => setSortHighToLow(!sortHighToLow)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.timeButtons}>
            <button
              className={`${styles.timeBtn} ${
                timeFilter === "day" ? styles.activeTimeBtn : ""
              }`}
              onClick={() => setTimeFilter("day")}
            >
              Today
            </button>
            <button
              className={`${styles.timeBtn} ${
                timeFilter === "week" ? styles.activeTimeBtn : ""
              }`}
              onClick={() => setTimeFilter("week")}
            >
              This Week
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {sortedMovies.map((movie) => (
          <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            key={movie.id}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className={styles.overlay}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <span className={styles.movieDate}>{movie.release_date}</span>
              <p className={styles.movieDescription}>{movie.overview}</p>
              <div className={styles.movieRating}>
                ⭐ {movie.vote_average.toFixed(1)}/10
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
