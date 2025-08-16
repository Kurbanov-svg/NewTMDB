import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { BANNER } from "./types";

export const useGetBannerQuery = () => {
  return useQuery<BANNER.GetBannerResponse, Error>({
    queryKey: ["banner"],
    queryFn: async () => {
      const { data } = await api.get("/movie/now_playing");
      return data;
    },
  });
};
