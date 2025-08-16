import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import bg1 from "../../../../../assets/bg1.webp";
import { useGetBannerQuery } from "../../../../../api/homebaner";

const duration = 7000;

const Welcome = () => {
  const navigate = useNavigate();
  const { data: banerData } = useGetBannerQuery();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!banerData?.results?.length) return;
    const len = banerData.results.length;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % len);
    }, duration);
    return () => clearInterval(id);
  }, [banerData?.results?.length]);

  const activeBanner = banerData?.results?.[activeIndex];
  const bgUrl = activeBanner?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${activeBanner.backdrop_path}`
    : bg1;

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 100%), url(${bgUrl})`,
      }}
      className={styles.wrapper}
    >
      <div className={styles.content}>
        <div className={styles.tags}>
          <h3 className={styles.tag}>Фильм</h3>
          <h3 className={styles.tag}>18+</h3>
          <h3 className={styles.tag}>2025</h3>
          <h3 className={styles.tag}>США</h3>
          <h3 className={styles.tag}>2ч 15мин</h3>
        </div>

        <h1 className={styles.title}>{activeBanner?.title || "Загрузка..."}</h1>
        <p className={styles.description}>
          {activeBanner?.overview || "Описание появится позже"}
        </p>

        <div className={styles.ratings}>
          <span className={styles.mainRating}>
            {activeBanner?.vote_average?.toFixed(1) || "0.0"}
          </span>
          <span className={styles.boxRating}>
            🎬 {activeBanner?.vote_average?.toFixed(1) || "7.9"}
          </span>
          <span className={styles.boxRating}>
            ⭐ {activeBanner?.vote_average?.toFixed(1) || "7.1"}
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.watch}
            onClick={() =>
              activeBanner?.id && navigate(`/movie/${activeBanner.id}`)
            }
          >
            ▶ Перейти к фильму
          </button>
          <button className={styles.favorite}>
            <span className={styles.star}>★</span> В избранное
          </button>
        </div>
      </div>
      <div className={styles.poster}>
        <img
          src={
            activeBanner?.poster_path
              ? `https://image.tmdb.org/t/p/w500${activeBanner.poster_path}`
              : bg1
          }
          alt={activeBanner?.title || "Poster"}
        />
      </div>
      <div className={styles.progressBar}>
        <div
          key={activeIndex}
          className={styles.progress}
          style={{ ["--duration" as any]: `${duration}ms` }}
        />
      </div>
    </section>
  );
};

export default Welcome;
