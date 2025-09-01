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
  const [getUsers, { isLoading, error, isSuccess }] = useAsync(async ({ page = 1, rewrite = true } = {}) => {
    const res = await fetchApi("get", `/user/search/${searchQuery.get("q")}`, {
      page
    });
    if (!res?.success) return;
    setUsers(prev => rewrite ? res.users : [...prev, ...res?.users]);
    setNextPage(rewrite ? 1 : res?.nextPage);
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
    getUsers({page: nextPage, rewrite: false})
  }, [nextPage, isSearchInactive, isLoading, inView, query, ref])

  return <div className = "space-y-1"  >
    {
     (!isLoading && isNoResultsFound) ? <div className = "flex opacity-70 justify-center items-center h-96 ">
       No results found
     </div> : users?.length > 0 && users.map((user) => <div className="dark:bg-zinc-900 bg-neutral-100 rounded-lg p-2  w-full flex flex-col gap-2" key={user._id}>
        <User className="text-sm p-2" user={user}>
          <User.Card size="8" />
        </User>
        <NavLink className="w-full p-2 bg-neutral-200 text-zinc-900 dark:text-neutral-100 dark:bg-zinc-700 text-sm rounded-lg text-neutral-100" to = {sessionUser._id === user._id ? "/profile" : `/users/${user.username}`}>
          View Profile
        </NavLink>
      </div>)
    }
    {
      isLoading && <UserCardPlaceholder number = {2} />
    }
  </div>
}

export default QueryUsers