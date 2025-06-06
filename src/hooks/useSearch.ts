import { isAfter, isBefore, parseISO, subWeeks } from "date-fns";
import { Movie } from "../App";
import { useMovieContext } from "./useMovieContext";

export function useSearch() {
  const { data, genres, loading } = useMovieContext();

  // Search movies by name
  function handleSearchByName(target: string, cb: (movies: Movie[]) => void) {
    const match = data.filter((movie) =>
      movie.original_title.toLowerCase().includes(target.toLowerCase())
    );
    cb(match);
  }

  // Search movies by genre name
  function handleSearchByGenre(
    movieGenre: string,
    cb: (movies: Movie[]) => void
  ) {
    const genreId = genres.find((genre) => genre.name === movieGenre)?.id;

    if (!genreId) {
      console.warn("Genre not found:", movieGenre);
      cb([]);
      return;
    }

    const match = data.filter((movie) => movie.genre_ids.includes(genreId));
    console.log(match);
    
    cb(match);
  }

  // 🔹 Search by category (Upcoming, Popular, etc.)
  function handleSearchByCategory(
    category: string,
    cb: (movies: Movie[]) => void
  ) {
    if (loading){
      return cb([]);
    }
    const currentDate = new Date();

    let match: Movie[] = [];

    switch (category) {
      case "Upcoming":
        match = data.filter((movie) => {
          if (!movie.release_date) return false;
          return isAfter(new Date(movie.release_date), currentDate);
        });
        break;

      case "Popular":
        match = data.filter((movie) => movie.popularity > 600);
        break;

      case "Top rated":
        match = data.filter((movie) => movie.vote_average > 7.0);
        break;

      case "Latest Realses": {
        const fiveWeeksAgo = subWeeks(currentDate, 5);
        match = data.filter((movie) => {
          if (!movie.release_date) return false;
          const releaseDate = parseISO(movie.release_date);
          return (
            isAfter(releaseDate, fiveWeeksAgo) &&
            isBefore(releaseDate, currentDate)
          );
        });
        break;
      }
      default:
        console.warn("Unknown category:", category);
        cb([]);
        return;
    }

    cb(match);
  }

  return {
    handleSearchByName,
    handleSearchByGenre,
    handleSearchByCategory,
  };
}
