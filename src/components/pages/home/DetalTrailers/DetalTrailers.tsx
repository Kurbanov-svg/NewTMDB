export interface VideoItem {
  site: string;
  key: string;
  type: string;
  name?: string;
  id?: string;
}

interface DetalTrailersProps {
  videos: VideoItem[];
  setSelectedKey: (key: string | null) => void;
}

const DetalTrailers: React.FC<DetalTrailersProps> = ({
  videos,
  setSelectedKey,
}) => {
  if (!videos.length) return null;

  return (
    <div>
      {videos.map((video) => (
        <button
          key={video.id || video.key}
          onClick={() => setSelectedKey(video.key)}
          style={{
            padding: "6px 12px",
            margin: "4px",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#1c1c20",
            color: "#fff",
          }}
        >
          {video.name || "Трейлер"}
        </button>
      ))}
    </div>
  );
};

export default DetalTrailers;
