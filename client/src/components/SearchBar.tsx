import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import useInterval from '../hooks/useInterval';
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const { mode } = useSelector(state => state.theme)

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

  return (
    <div className="w-full flex items-center gap-2 my-4 px-2 py-2 rounded-2xl shadow-md bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800  mx-auto">
      <div className="flex items-center w-full flex-grow gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[currIndex]}
          className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all duration-150"
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        {query.length > 0 && (
          <button
            className="p-2 rounded-full bg-neutral-200 dark:bg-zinc-700 hover:bg-neutral-300 dark:hover:bg-zinc-600 transition-colors"
            onClick={handleReset}
            aria-label="Clear search"
          >
            <IoIosClose size={22} />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-colors duration-150 shadow"
        aria-label="Search"
      >
        <CiSearch size={22} />
      </button>
    </div>
  );
}

export default SearchBar
