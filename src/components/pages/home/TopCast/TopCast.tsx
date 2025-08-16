import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";
import styles from "./TopCast.module.css";
import { useNavigate } from "react-router-dom";

interface TopCastProps {
  type: string;
  id: string;
}

const TopCast = ({ type, id }: TopCastProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["topCast", type, id],
    queryFn: async () => {
      const { data } = await api.get(`/${type}/${id}/credits?language=ru-RU`);
      return data.cast || [];
    },
    enabled: !!type && !!id,
  });

  if (isLoading) return <div>Загрузка актёров...</div>;
  if (error) return <div>Ошибка загрузки актёров</div>;

  const baseUrl = "https://image.tmdb.org/t/p/w200";

  return (
    <div className={styles.topCastContainer}>
      <h2 className={styles.title}>Съёмочная группа</h2>
      <div className={styles.castList}>
        {data.map((actor: any) => (
          <div
            key={actor.id}
            className={styles.actorCard}
            onClick={() => navigate(`/actor/${actor.id}`)}
          >
            <img
              src={
                actor.profile_path
                  ? `${baseUrl}${actor.profile_path}`
                  : "/no-avatar.png"
              }
              alt={actor.name}
              className={styles.actorImage}
            />
            <span className={styles.actorName}>{actor.name}</span>
            <span className={styles.actorRole}>{actor.character}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCast;
