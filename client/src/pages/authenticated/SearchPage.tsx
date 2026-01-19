import SearchBar from '../../components/SearchBar.jsx';
import { useSearchParams } from "react-router-dom"
import { useEffect, useState, useMemo } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { Outlet, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import usePath from '../../hooks/usePath.js';
const SearchPage = () => {
  const [searchQuery] = useSearchParams();
  const [nearlyCompletedSurveys, setNearlyCompletedSurveys] = useState([])
  const [getNearlyCompleteSurveys, { isLoading, error }] = useAsync(async () => {
    const res = await fetchApi("get", "/survey/nearly-complete");
    if (!res?.success) return;

    setNearlyCompletedSurveys(res?.surveys)
  })
  const { isInThisPath } = usePath();

  useEffect(() => {
    getNearlyCompleteSurveys();
  }, []);

  const query = searchQuery.get("q"); // get the 'q' param
  const isSearchActive = query && query.trim() !== "" && query !== "null";


  return (
    <div className="space-y-3 py-6 md:py-1 w-11/12 mx-auto p-1">
      <SearchBar />
      <div className="w-full flex justify-center">
        <NavLink
          to={!isSearchActive ? "/browse" : `/browse?q=${searchQuery.get("q")}`}
          className={` ${
            isInThisPath("/browse") && " border-b-1  dark:border-neutral-100 "
          } p-2 w-full text-center`}
        >
          Surveys
        </NavLink>
        <NavLink
          to={
            !isSearchActive
              ? "/browse/users"
              : `/browse/users?q=${searchQuery.get("q")}`
          }
          className={` ${
            isInThisPath("/browse/users") && " border-b-1 border-zinc-900 dark:border-neutral-100 "
          } w-full p-2 text-center`}
        >
          Users
        </NavLink>
      </div>
      <div className="min-h-100 flex flex-col justify-center items-start w-full ">
        {isSearchActive ? (
          <div className="w-full sm:w-11/12 mx-auto flex flex-col justify-start p-1  ">
            <Outlet />
          </div>
        ) : (
          !isLoading && (
            <div className=" flex gap-2 items-center w-full justify-center h-96">
              <CiSearch size={30} />
              <p>Start Searching!</p>
            </div>
          )
        )}
  
      </div>
    </div>
  );
}

export default SearchPage