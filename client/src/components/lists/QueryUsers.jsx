import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';
import { useSearchParams, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';
import User from '../UserIcon.jsx';
import UserCardPlaceholder from '../card/placeholders/UserCardPlaceholder.jsx';
import { useInView } from 'react-intersection-observer';

const QueryUsers = () => {
  const [searchQuery] = useSearchParams();
  
  const { user: sessionUser } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isNoResultsFound, setIsNoResultsFound] = useState(false);
  
  const { ref, inView } = useInView();
  const [getUsers, { isLoading, error, isSuccess }] = useAsync(async ({ page = 1, overwrite = true } = {}) => {
    const res = await fetchApi("get", `/user/search/${searchQuery.get("q")}`, {
      page
    });
    if (!res?.success) return;
    console.log(res);
    
    setUsers(prev => overwrite ? res.users : [...prev, ...res?.users]);
    setNextPage(overwrite ? 1 : res?.nextPage);
    setIsNoResultsFound(res?.isNoResultsFound)
  })

  const query = searchQuery.get("q");
  const isSearchInactive = !query || !query.trim() || query === "null"

  useEffect(() => {
    if (isSearchInactive) return;
    getUsers();
  }, [isSearchInactive, query])
  
  useEffect(() => {
    if (isSearchInactive || isLoading || nextPage === null || !inView ) return;
    getUsers({page: nextPage, overwrite: false})
  }, [nextPage, isSearchInactive, isLoading, inView, query, ref])

  return (
    <div className="space-y-4 w-full max-w-2xl flex flex-col justify-start mx-auto">
      {!isLoading && isNoResultsFound ? (
        <div className="flex opacity-70 justify-center items-center h-96 text-lg font-medium text-gray-500 dark:text-gray-400">
          No results found
        </div>
      ) : (
        users?.length > 0 &&
        users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 w-full flex flex-col gap-3 border border-neutral-200 dark:border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <User className="text-sm" user={user}>
                <User.Avatar size = {12}  />
              </User>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg text-zinc-800 dark:text-neutral-100">{user.username}</span>
                {sessionUser._id === user._id ? (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300 w-fit">You</span>
                ) : (
                  user.hasSimilarInterest && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-900 dark:text-green-300 w-fit">Has similar Interests</span>
                  )
                )}
              </div>
            </div>
            <NavLink
              className="w-full p-2 mt-2 bg-blue-50 text-blue-700 dark:text-blue-200 dark:bg-blue-900 text-sm rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors duration-150 text-center"
              to={
                sessionUser._id === user._id
                  ? "/profile"
                  : `/users/${user.username}`
              }
            >
              View Profile
            </NavLink>
          </div>
        ))
      )}
      {isLoading && <UserCardPlaceholder number={2} />}
    </div>
  );
}

export default QueryUsers