import { useQuery } from "@tanstack/react-query";
import { api } from "..";

type VideoItem = {
  site: string;
  key: string;
  type: string;
  name?: string;
  id?: string;
};

type VideosResponse = {
  results: VideoItem[];
};

export const useGetVideosQuery = (type: string, id: string) => {
  return useQuery<VideosResponse>({
    queryKey: ["videos", type, id],
    queryFn: async () => {
      const { data } = await api.get(`/${type}/${id}/videos?language=ru-RU`);
      return data;
    },
    enabled: !!type && !!id,
  });
};
