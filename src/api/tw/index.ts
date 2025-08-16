import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetContentInfinite = (type: "movie" | "tv") => {
  return useInfiniteQuery({
    queryKey: [type],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get(`/${type}/popular`, {
        params: { page: pageParam, language: "ru-RU" },
      });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};
