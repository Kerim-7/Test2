import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotifications } from '../services/api';

export const useInfiniteNotifications = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['notifications', 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchNotifications({ pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
