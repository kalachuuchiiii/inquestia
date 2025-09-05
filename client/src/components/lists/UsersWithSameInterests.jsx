import { useEffect, useState } from 'react'
import { fetchApi } from '../../utils/fetchApi';
import useAsync from '../../hooks/useAsync';
import UserIcon from '../UserIcon';
import { useSelector } from 'react-redux';



const UsersWithSameInterests = () => {
    const { user } = useSelector((state) => state.user);
    const [ users, setUsers ] = useState([]);
    const [getUsers, { isLoading, error }] = useAsync(async () => {
        const res = await fetchApi("get", `/user/similar-interests`);
        if (!res?.success) return;
        console.log(res);
        setUsers(res.users);
    })

    useEffect(() => {

        getUsers();
    }, []);


  return (
    <div className="w-2/4 top-0 sticky right-0 h-screen pb-6 px-6 hidden lg:block">
      <div>
        <div className="flex items-center gap-3 px-4 py-5 h-16 border-b border-gray-200 dark:border-gray-800">
          <div className="shrink-0 ">
            <UserIcon user={user}>
              <UserIcon.Avatar size="12" />
            </UserIcon>
          </div>
          <div className="flex flex-col truncate">
            <p className="font-semibold truncate">{user?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-lg my-4">
        Users with similar interests
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Connect with users who share your interests and explore new
        perspectives.
      </p>
      <hr className="mb-4" />
      <div>
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="p-2 border-b border-neutral-200 dark:border-neutral-800"
            >
              <UserIcon user={user}>
                <UserIcon.Card size="8" />
              </UserIcon>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UsersWithSameInterests