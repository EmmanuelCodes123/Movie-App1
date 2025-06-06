import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMovieContext } from "../hooks/useMovieContext";
import { Movie } from "../App";
import { BookCheck, Bookmark, ChevronLeft } from "lucide-react";
import { FooterBtns } from "./FooterBtns";

export function MovieDetails() {
  const { movieId } = useParams();
  const numMovieId = Number(movieId);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [checked, setChecked] = useState(false);
  const { data, genres, setWatchList, watchList } = useMovieContext();
  const navigate = useNavigate();

  const matchGenres = (genre_ids: number[]) => {
    const filtGenre = genres.filter((genre) => genre_ids.includes(genre.id));

    return filtGenre.map((f) => f.name);
  };

  function addToWatchList(id: number) {
    const movieToAdd = data.find((movie) => movie.id === id);
    if (movieToAdd && checked) {
      setWatchList((prevList) => [...prevList, movieToAdd]);
      console.log(watchList);
    } else if (!checked) {
      setWatchList((prevList) => prevList.filter((movie) => movie.id !== id));
      console.log(watchList);
      
    }
    setChecked((c) => !c);
  }

  useEffect(() => {
    setMovie(data.filter((movie) => movie.id === numMovieId));
  }, [data, numMovieId]);

  return (
    <article className="w-full h-screen overflow-scroll bg-[var(--bg-clr)] text-white">
      <header className="flex justify-between p-3 text-3xl align-middle">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h2>Details</h2>
        <button onClick={() => addToWatchList(numMovieId)}>
          {!checked ? <Bookmark /> : <BookCheck />}
        </button>
      </header>
      {movie.map((m) => (
        <div>
          <div className="w-full h-[400px]">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
              alt={m.original_title}
            />
          </div>
          <div className="relative">
            <div className="w-[95px] h-[150px] absolute top-[-50px] left-[16px]">
              <img
                src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                alt={m.original_title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h2 className="ml-32 mt-3 text-3xl font-bold">
              {m.original_title}
            </h2>
          </div>
          <div className="ml-32 flex space-x-3 mt-2">
            <h2>{m.release_date}</h2>
            <h2>{matchGenres(m.genre_ids).slice(0, 1)}</h2>
          </div>
          <main className="mt-11 w-full px-3 pb-20">
            <div className="w-full">
              <h2 className="text-center text-2xl">About Movie</h2>
            </div>
            <div className="mt-2">
              <p>{m.overview}</p>
            </div>
            <div>
              
            </div>
          </main>
        </div>
      ))}
      <FooterBtns />
    </article>
  );
}
