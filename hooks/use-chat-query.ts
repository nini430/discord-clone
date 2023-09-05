import { useSocket } from '@/components/providers/socket-provider';
import { useInfiniteQuery } from '@tanstack/react-query';
import qs from 'query-string';

interface ChatQueryProps {
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  queryKey: string;
  apiUrl: string;
}

const useChatQuery = ({
  paramKey,
  paramValue,
  queryKey,
  apiUrl,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        [paramKey]: paramValue,
      },
    });

    const response = await fetch(url);
    return response.json();
  };

  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, status, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useChatQuery;