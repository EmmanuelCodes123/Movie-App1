import { useMovieContext } from "../hooks/useMovieContext";
import { Categories } from "./Categories";
import { FooterBtns } from "./FooterBtns";
import { Header } from "./Header";
import { Top5 } from "./Top5";

export default function HomeScreen() {
  const { data, loading } = useMovieContext();

  if (loading) {
    return;
  }
  if (data) {
    return (
      <div className="w-90 bg-[var(--bg-clr)] h-screen text-white p-2">
        <Header />
        <Top5 />
        <Categories />
        <FooterBtns />
      </div>
    );
  }
}
