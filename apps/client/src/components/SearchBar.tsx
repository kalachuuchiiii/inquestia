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
  InputGroupInput,
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
    <div className="w-full  flex items-start flex-col gap-6   mx-auto">
      <header className="w-full">
        <h1 className="text-2xl font-bold tracking-tighter">
          Search users or surveys
        </h1>
        <p className="text-lg opacity-75">Type keywords, or tags/interests</p>
      </header>
      <InputGroup className="flex items-center w-full flex-grow my-2 gap-2">
        <InputGroupInput
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
            variant={"ghost"}
            aria-label="Clear search"
          >
            <IoIosClose className="size-5" />
          </Button>
        )}
        <InputGroupButton
          variant={"ghost"}
          type="button"
          onClick={handleSearch}
          aria-label="Search"
        >
          <CiSearch className="lg:size-5" />
        </InputGroupButton>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
