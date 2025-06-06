import { useNavigate } from "react-router";
import { Movie } from "../App";

export function SearchedMovies({
  searchedMovies,
  defaultMovies,
  matchGenres,
  searchValue,
}: {
  searchedMovies: Movie[];
  searchValue: string,
  defaultMovies: Movie[];
  matchGenres: (g: number[]) => string[];
}) {
  const navigate = useNavigate()
  return (searchValue ? searchedMovies : defaultMovies.slice(0, 10)).map((movie, i) => (
    <div onClick={() => {navigate(`/movie-details/${movie.id}`)}} className="w-full flex mb-5" key={i}>
      <div className="w-[150px] h-[200px]">
        <img
        className="w-full h-full object-cover rounded-2xl"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt=""
        />
      </div>
      <div className="ml-2">
        <h2 className="text-2xl font-bold">{movie.original_title}</h2>
        {matchGenres(movie.genre_ids)
          .slice(0, 2)
          .map((genre) => (
            <span className="text-[20px] mt-10" key={genre}>{`${genre}, `}</span>
          ))}
      </div>
    </div>
  ));
}

