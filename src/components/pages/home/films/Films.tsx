import styles from "./Films.module.css";
import { Link } from "react-router-dom";
import { useGetFilmsInfinite } from "../../../../api/films";

const Films = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFilmsInfinite();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div>
      <div className={styles.filmscontainer}>
        {data?.pages.flatMap((page) =>
          page.results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className={styles.filmcard}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className={styles.overlay}>
                <h3>{movie.title}</h3>
                <span className={styles.rating}>
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
        </button>
      )}
    </div>
  );
};

export default Films;
