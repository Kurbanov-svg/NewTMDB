export namespace TRENDING {
  export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
  }

  export interface GetTrendingRessponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
}
