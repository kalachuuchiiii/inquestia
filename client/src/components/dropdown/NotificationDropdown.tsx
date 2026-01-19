import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchApi } from '../../utils/fetchApi'
import NotificationCard from '../card/NotificationCard'

const NotificationDropdown = () => {
  // Query function for infinite query
  const getNotifications = async ({ pageParam = 1 }) => {
    const res = await fetchApi('get', '/notification/list', { page: pageParam })
    return res;
  }
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    getNextPageParam: (lastPage) => lastPage.nextPage, 
  })

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? []

  return (
    <div className="fixed right-4 top-20 z-50 w-80 bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-4 border border-gray-200 dark:border-zinc-800 animate-fade-in">
      <div className="font-semibold mb-2">Notifications</div>

      <div className="max-h-64 overflow-y-auto flex flex-col gap-2">
        {isLoading ? (
          <div className="text-sm text-gray-500 dark:text-gray-300">Loading...</div>
        ) : isError ? (
          <div className="text-sm text-red-500">Failed to load notifications.</div>
        ) : notifications.length > 0 ? (
          <>
            {notifications.map((notif) => (
              <NotificationCard key={notif._id} notif={notif} />
            ))}
            {hasNextPage ? (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-2 text-sm text-blue-500 hover:underline disabled:text-gray-400"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </button>
            ) : (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-300 text-center">
                You’ve reached the end.
              </div>
            )}
          </>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-300">No notifications yet.</div>
        )}
      </div>
    </div>
  )
}

export default NotificationDropdown

