import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { POPULAR } from "./types";

export const useGetTrendingQuery = () => {
  return useQuery<POPULAR.GetPopularRessponse, Error>({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data } = await api.get(`/movie/popular`);
      return data;
    },
  });
};
