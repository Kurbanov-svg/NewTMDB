import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { PiSpeakerHighBold } from "react-icons/pi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useGetDetailsQuery } from "../../../../api/detalis";
import TopCast from "../TopCast/TopCast";
import { useGetSimilarQuery } from "../../../../api/detalVidios";
import { useGetVideosQuery } from "../../../../api/detalTrailers";
import DetalTrailers from "../DetalTrailers/DetalTrailers";
import styles from "./DetalisPages.module.css";
import { useState, useEffect } from "react";
import DetalVidios, { type MovieType } from "../detalVidios/DetalVidios";

const DetalisPages = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: similar, isLoading: similarLoading } = useGetSimilarQuery(
    type!,
    id!
  );
  const { data: videos } = useGetVideosQuery(type!, id!);
  const { data: detailsData, error } = useGetDetailsQuery(type!, id!);

  useEffect(() => {
    if (!selectedKey && videos?.results?.length) {
      const firstTrailer = videos.results.find(
        (v) =>
          v.site?.toLowerCase() === "youtube" &&
          v.type?.toLowerCase() === "trailer"
      );
      if (firstTrailer?.key) setSelectedKey(firstTrailer.key);
    }
  }, [videos, selectedKey]);

  if (error) return <div>Ошибка загрузки</div>;
  if (!detailsData) return <div>Нет данных</div>;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const backdrop = detailsData.backdrop_path
    ? `${baseUrl}original${detailsData.backdrop_path}`
    : "";
  const logoPath = detailsData.images?.logos?.[0]?.file_path;
  const logo = logoPath ? `${baseUrl}original${logoPath}` : null;

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.container}>
            {logo ? (
              <img src={logo} alt="Логотип фильма" className={styles.logo} />
            ) : (
              <h1 className={styles.titleRu}>
                {detailsData.title || detailsData.name}
              </h1>
            )}

            <div className={styles.subRow}>
              <h2 className={styles.titleEn}>
                {detailsData.original_title || detailsData.original_name}
              </h2>
              <span className={styles.age}>18+</span>
            </div>

            <div className={styles.ratings}>
              <span className={`${styles.rating} ${styles.purple}`}>
                {detailsData.vote_average?.toFixed(1)}
              </span>
              <span className={`${styles.rating} ${styles.gray}`}>КП 8.2</span>
              <span className={`${styles.rating} ${styles.black}`}>
                IMDb 8.0
              </span>
              <span>
                {(
                  detailsData.release_date || detailsData.first_air_date
                )?.slice(0, 4)}
              </span>
              <span>{detailsData.origin_country?.[0]}</span>
              <span>{detailsData.genres?.[0]?.name}</span>
            </div>

            <div className={styles.options}>
              <span className={styles.option}>4K</span>
              <span className={styles.option}>
                <PiSpeakerHighBold size={16} /> 5.1
              </span>
              <span className={styles.option}>
                <MdOutlineOndemandVideo size={16} /> {type?.toUpperCase()}
              </span>
            </div>

            <div className={styles.buttons}>
              <button className={styles.watch}>Смотреть от 49 ₽</button>
              <button
                className={styles.trailer}
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlay size={12} style={{ marginRight: "6px" }} /> Трейлер
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsBlock}>
        {detailsData.overview && (
          <p className={styles.overview}>{detailsData.overview}</p>
        )}
        <div className={styles.moreInfo}>
          {detailsData.runtime && (
            <span>Длительность: {detailsData.runtime} мин</span>
          )}
          {detailsData.budget > 0 && (
            <span>Бюджет: ${detailsData.budget.toLocaleString()}</span>
          )}
          {detailsData.revenue > 0 && (
            <span>Сборы: ${detailsData.revenue.toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className={styles.sectionDivider}></div>

      <div className={styles.topCastWrapper}>
        <TopCast type={type!} id={id!} />
        <DetalVidios
          movies={similar?.results as MovieType[]}
          loading={similarLoading}
        />
        <DetalTrailers
          videos={videos?.results || []}
          setSelectedKey={(key) => {
            setSelectedKey(key);
            setIsModalOpen(true);
          }}
        />
      </div>

      {isModalOpen && selectedKey && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedKey}?autoplay=1`}
              title="Трейлер"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DetalisPages;
