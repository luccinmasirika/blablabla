import useSWR from 'swr';
import { Post } from '@/types/post';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePosts() {
  const { data, error, isLoading } = useSWR<Post[]>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
  };
}