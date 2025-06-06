import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { Movie } from "../App";
import { Filter } from "lucide-react";
import { useMovieContext } from "../hooks/useMovieContext";
import { SearchedMovies } from "./SearchedMovies";
import { FooterBtns } from "./FooterBtns";

export function Search() {
  const { data, genres } = useMovieContext();
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { handleSearchByName: search } = useSearch();
  const { handleSearchByGenre } = useSearch();
  const [isActive, setIsActive] = useState(false);

  const genresList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  const defaultMovies: Movie[] = data.filter(
    (movie) =>
      movie.popularity > 50 && movie.vote_average > 7 && movie.vote_count > 550
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value.toLocaleLowerCase());

    search(searchValue, setSearchedMovies);
  }

  function handleGenreSearch(genre: string) {
    handleSearchByGenre(genre, setSearchedMovies);
    console.log(searchedMovies);
  }

  const matchGenres = (genre_ids: number[]) => {
    const filtGenre = genres.filter((genre) => genre_ids.includes(genre.id));

    return filtGenre.map((f) => f.name);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[var(--bg-clr)] text-white p-3">
        <div className="w-full flex align-middle justify-between">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchValue}
            onChange={handleSearch}
            className="outline-none text-[#868a8e]"
            onClick={() => setSearchValue('')}
          />
          <button>
            <Filter onClick={() => setIsActive((a) => !a)} />
          </button>
        </div>
        <div className={`mt-2 ${isActive ? "flex" : "hidden"} flex-col`}>
          <div className="flex w-[full] flex-wrap space-x-2 space-y-2 mt-2">
            {genresList.map((genre) => (
              <h2
                key={genre}
                onClick={() => {
                  handleGenreSearch(genre);
                  setSearchValue('Search for a movie...')
                }}
              >
                {genre}
              </h2>
            ))}
          </div>
        </div>

        <div className="w-full mt-6 flex flex-wrap justify-center space-x-2 space-y-2">
          <SearchedMovies
            searchValue={searchValue}
            searchedMovies={searchedMovies}
            matchGenres={matchGenres}
            defaultMovies={defaultMovies}
          />
        </div>
        <FooterBtns />
      </div>
    </>
  );
}
