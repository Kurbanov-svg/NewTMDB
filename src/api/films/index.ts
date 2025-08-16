import { useInfiniteQuery } from "@tanstack/react-query";
import type { FILMS } from "./types";
import { api } from "..";

export const useGetFilmsInfinite = () => {
  return useInfiniteQuery<FILMS.GetFilmsResponse, Error>({
    queryKey: ["films"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get("/movie/popular", {
        params: {
          page: pageParam,
          language: "ru-RU",
        },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
