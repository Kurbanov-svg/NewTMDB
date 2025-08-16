import styles from "./DetalTrailers.module.css";

interface DetalTrailersProps {
  videos: VideoItem[];
  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
}

const DetalTrailers = ({ videos, setSelectedKey }: DetalTrailersProps) => {
  if (!videos?.length) return null;

  return (
    <div className={styles.trailersContainer}>
      <h2 className={styles.title}>Трейлеры</h2>
      <div className={styles.trailersList}>
        {videos
          .filter((v) => v.site === "YouTube")
          .map((video) => (
            <div
              key={video.id}
              className={styles.trailerCard}
              onClick={() => setSelectedKey(video.key)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                alt={video.name}
                className={styles.thumbnail}
              />
              <p className={styles.trailerName}>{video.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetalTrailers;
