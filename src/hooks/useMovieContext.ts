import { createContext, useContext } from "react";
import { Genre, Movie } from "../App";

type MovieContextType = {
  data: Movie[];
  loading: boolean;
  genres: Genre[];
  watchList: Movie[];
  setWatchList: React.Dispatch<React.SetStateAction<Movie[]>>;
};

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}
