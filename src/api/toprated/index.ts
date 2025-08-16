import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { TOPRATED } from "./types";

export const useGetTopRatedQuery = () => {
  return useQuery<TOPRATED.GetTopRatedResponse, Error>({
    queryKey: ["toprated"],
    queryFn: async () => {
      const { data } = await api.get(`movie/top_rated`);
      return data;
    },
  });
};
