export namespace ACTOR_BIO {
  export interface MovieCredit {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    job?: string;
  }

  export interface ActorBio {
    id: number;
    name: string;
    biography: string;
    profile_path: string | null;
    movie_credits?: {
      cast: MovieCredit[];
      crew: MovieCredit[];
    };
  }

  export type GetActorBioResponse = ActorBio;
}
