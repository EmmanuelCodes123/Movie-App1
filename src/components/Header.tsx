import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <header className="w-[100%] ">
        <h2 className="text-[23px] font-bold">What Do You Want To Watch ?</h2>
        <Link className="w-[95%] h-[50px] p-3 text-[#4b4e55] rounded-2xl mx-auto bg-[#3a3f47] flex items-center justify-between mt-3" to="/search">
          <h2 className="text-[15px] ">Search</h2>
          <Search />
        </Link>
      </header>
    </>
  );
}
