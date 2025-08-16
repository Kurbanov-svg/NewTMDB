export namespace FILMS {
  export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string | null;
  }

  export interface GetFilmsResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
}
