export namespace DETAL {
  export interface Images {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  }

  export interface GetDetalResponse {
    change_keys: string[];
    images: Images;
  }
}

export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
  genres: { id: number; name: string }[];
  origin_country?: string[];
}
