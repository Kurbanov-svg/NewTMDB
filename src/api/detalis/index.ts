import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useGetDetailsQuery = (type: string, id: string) => {
  return useQuery({
    queryKey: [type, id],
    queryFn: async () => {
      const { data } = await api.get(
        `/${type}/${id}?language=ru-RU&append_to_response=images&include_image_language=ru,en,null`
      );
      return data;
    },
    enabled: !!type && !!id,
  });
};
