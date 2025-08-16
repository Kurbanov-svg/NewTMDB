import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetTrendingQuery = (time: "day" | "week") => {
  return useQuery({
    queryKey: ["trending", time],
    queryFn: async () => {
      const { data } = await api.get(`/trending/all/${time}`);
      return data;
    },
  });
};
