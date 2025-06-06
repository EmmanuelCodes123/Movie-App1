import {  useEffect, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { Movie } from "../App";
import { useMovieContext } from "../hooks/useMovieContext";

export function Categories() {
  const { data } = useMovieContext();
  const categoryLinks = ["Upcoming", "Popular", "Top rated", "Latest Realses"];
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");
  const { handleSearchByCategory } = useSearch();

  const handleSearch = (category: string) => {
    handleSearchByCategory(category, setSortedMovies);
    console.log(sortedMovies);
    
    return sortedMovies.slice(0, 9)
  };

  useEffect(() => {
    setSortedMovies(() => {
      return data.filter((movie) => movie.popularity > 600)
    }) 
  }, [data])
 
  return (
    <>
      <div>
        <div className="flex w-full justify-between mt-6 mb-6 shadow-lg">
          {categoryLinks.map((link) => (
            <h2
              onClick={() => {
                handleSearch(link);
                setSelectedCategory(link);
              }}
              className={link === selectedCategory ? 'underline' : ''}  
            >
              {link}
            </h2>
          ))}
        </div>
        {sortedMovies ? (
          <div className="flex w-full h-full overflow-y-scroll space-x-3 space-y-3 ml-2 flex-wrap">
            {sortedMovies.length != 0 ? (
              sortedMovies.map((movie) => (
                <div className="w-[100px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-full rounded-2xl"
                  />
                </div>
              ))
            ) : (
              <h2 className="text-black font-bold">No Movies For Now</h2>
            )}
          </div>
        ) : (
          <div className="h-300">Loading...</div>
        )}
      </div>
    </>
  );
}
