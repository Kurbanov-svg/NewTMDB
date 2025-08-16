import { useQuery } from "@tanstack/react-query";
import { api } from "..";
import type { ACTOR_BIO } from "./types";

export const useGetActorBioQuery = (actorId: number) => {
  return useQuery<ACTOR_BIO.GetActorBioResponse, Error>({
    queryKey: ["actor-bio", actorId],
    queryFn: async () => {
      const { data } = await api.get(`/person/${actorId}`, {
        params: {
          language: "ru-RU",
          append_to_response: "movie_credits",
        },
      });
      return data;
    },
    enabled: !!actorId,
  });
};
