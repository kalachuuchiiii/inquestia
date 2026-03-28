import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "./ui/input-group";
import { Button } from "./ui/button";
const placeholders = [
  "Search anything...",
  "Looking for someone?",
  "Type a name or topic",
  "Start typing to explore",
  "What do you need today?",
  "Search and discover",
  "Find what matters",
  "Type here...",
  "Explore surveys and people",
];
const SearchBar = () => {
  const [currIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [query, setQuery] = useState(searchQuery.get("q") || "");

  const handleSearch = () => {
    if (query.length === 0) return;
    setSearchQuery({ q: query.trim() });
  };

  const handleClearSearch = () => setQuery("");

  return (
    <div className="w-full flex items-center gap-2 my-4 px-2 py-2 rounded-2xl shadow-md bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800  mx-auto">
      <InputGroup className="flex items-center w-full flex-grow gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[currIndex]}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        {query.length > 0 && (
          <Button
            onClick={handleClearSearch}
            variant={"secondary"}
            aria-label="Clear search"
          >
            <IoIosClose size={22} />
          </Button>
        )}
      </InputGroup>
      <Button
        type="button"
        onClick={handleSearch}
        className="inquestia-button"
        aria-label="Search"
      >
        <CiSearch size={22} />
      </Button>
    </div>
  );
};

export default SearchBar;
