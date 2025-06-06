import { useEffect, useState } from "react";
import { useMovieContext } from "../hooks/useMovieContext";
import { Movie } from "../App";
import { Link } from "react-router";

export function Top5() {
  const { data, loading } = useMovieContext();
  const [topFive, setTopFive] = useState<Movie[]>([]);

  useEffect(() => {
    if (data) {
      const sortedMovies = data
        .slice()
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5);
      setTopFive(sortedMovies);
    }
    console.log(loading);
  }, [data]);
  return (
    <>
      {!loading ? (
        <div className="flex overflow-x-auto space-x-4">
          {topFive.map((movie, index) => (
            <Link to={`/movie-details/${movie.id}`}>
              <div className="mt-10 w-[150px] relative flex-shrink-0 ">
                <div className="w-full ">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute bottom-[-20px] left-[-5px]">
                  <h2 className="text-8xl font-bold text-white ">{index + 1}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="h-30">Loading....</h2>
      )}
    </>
  );
}
