import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetSimilarQuery = (type?: string, id?: string) => {
  return useQuery<DetalVidiosProps>({
    queryKey: ["similar", type, id],
    queryFn: async () => {
      const { data } = await api.get<DetalVidiosProps>(
        `/${type}/${id}/similar?language=ru-RU&page=1`
      );
      return data;
    },
    enabled: !!type && !!id,
  });
};
