interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
}

interface DetalVidiosProps {
  movies: Movie[];
  loading: boolean;
  results: string;
}
