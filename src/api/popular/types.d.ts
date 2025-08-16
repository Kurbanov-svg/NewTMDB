export namespace POPULAR {
  export interface Movie {
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }
  export interface GetPopularRessponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
}
