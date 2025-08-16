import { useGetContentInfinite } from "../../../../api/tw";
import styles from "./TWshow.module.css";
import { Link } from "react-router-dom";

interface ShowType {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

const TWshow = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetContentInfinite("tv");

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div>
      <div className={styles.filmscontainer}>
        {data?.pages.flatMap((page) =>
          page.results.map((show: ShowType) => (
            <Link
              key={show.id}
              to={`/tv/${show.id}`}
              className={styles.filmcard}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                alt={show.name}
              />
              <div className={styles.overlay}>
                <h3>{show.name}</h3>
                <span className={styles.rating}>
                  ⭐ {show.vote_average.toFixed(1)}
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

export default TWshow;
