import { Bookmark, Home, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function FooterBtns() {
  const navigate = useNavigate()
  return (
    <footer className="w-full border-t-2 fixed bottom-0 bg-[var(--bg-clr)] border-t-[#0296e5] flex px-10 py-3 justify-between items-center left-0">
      <Home onClick={() => navigate('/')}/>

      <SearchIcon onClick={() => navigate('/search')}/>

      <Bookmark onClick={() => navigate('/watchList')}/>
    </footer>
  );
}
