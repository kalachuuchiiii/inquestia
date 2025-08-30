import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import useInterval from '../hooks/useInterval.js';
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
const placeholders = [
  "Search anything...",
  "Looking for someone?",
  "Type a name or topic",
  "Start typing to explore",
  "What do you need today?",
  "Search and discover",
  "Find what matters",
  "Type here...",
  "Explore surveys and people"
];
const SearchBar = () => {

  const [currIndex, setCurrIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [query, setQuery] = useState(searchQuery.get("q") || "");

  useInterval({
    fn: () => {
      const rand = Math.round(Math.random() * placeholders.length - 1);
      setCurrIndex(rand)
    },
    interval: 7000
  });

  const handleSearch = () => {
    if (query.length === 0) return;
    setSearchQuery({ q: query.trim() });
  }
  
  const handleReset = () => {
    setSearchQuery({q: null}); 
    setQuery("");
  }

  return <div className="w-full grid grid-cols-12 outline-1 outline-neutral-100/20 mx-auto overflow-hidden rounded-lg ">
    <div className = "w-full col-span-10 p-2 col-start-1  flex items-center">
      <input  value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholders[currIndex]} className="w-full outline-none" />
      <button className = "p-2" onClick={handleReset}> <IoIosClose size = "20" /> </button>
    </div>
    <button onClick={handleSearch} className="col-span-2 w-full bg-neutral-100 text-zinc-900 place-items-center place-content-center text-center col-start-11">
      <CiSearch color = 'black' size="20" />
    </button>
  </div>
}

export default SearchBar