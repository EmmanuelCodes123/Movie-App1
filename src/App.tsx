import { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import { Route, Routes } from "react-router-dom";

import { z } from "zod";
import { MovieContext } from "./hooks/useMovieContext";
import { Search } from "./components/Search";
import { MovieDetails } from "./components/MovieDetails";

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
    message: "Invalid date format, expected YYYY-MM-DD",
  }),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type Genre = {
  id: number;
  name: string;
};

function App() {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [watchList, setWatchList] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=4d427f8af0a5b38a91ef56815e3e0a69"
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const response = await res.json();
        setGenres(response.genres);
        console.log("Genres fetched:", response.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allResults = [];

        for (let page = 1; page <= 3; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?page=${page}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDQyN2Y4YWYwYTViMzhhOTFlZjU2ODE1ZTNlMGE2OSIsIm5iZiI6MTc0NDk2NDg5NC4xMzIsInN1YiI6IjY4MDIwZDFlZTAzMjA3ZDBiMWQ5MTNmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RM2RXvdVQRarIXPTE4ePSRsB23HTmB3MhJ1PAHpL7Bw",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const json = await response.json();
          allResults.push(...json.results);
          setLoading(false);
          console.log(json);
          
        }

        setData(allResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MovieContext.Provider value={{ data, loading, genres, watchList, setWatchList }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} />
      </Routes>
    </MovieContext.Provider>
  );
}

export default App;
