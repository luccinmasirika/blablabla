'use client';

import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import Masonry from 'react-masonry-css';
import { searchQueryAtom, filteredPostsAtom, currentPageAtom, postsPerPageAtom } from '@/store/posts';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

const breakpointColumns = {
  default: 3,
  1280: 3,
  1024: 2,
  640: 1
};

export default function Home() {
  const { posts, isLoading, isError } = usePosts();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [filteredPosts, setFilteredPosts] = useAtom(filteredPostsAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [postsPerPage] = useAtom(postsPerPageAtom);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!posts) return;
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
      setCurrentPage(1); // Reset to first page when searching
    }, 300),
    [posts]
  );

  useEffect(() => {
    if (posts) {
      debouncedSearch(searchQuery);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, posts, debouncedSearch]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredPosts.length / postsPerPage);
  }, [filteredPosts.length, postsPerPage]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full animate-spin" />
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error loading posts</div>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Posts
        </h1>
        <p className="text-gray-400">Browse through our collection of posts</p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mt-12">
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {paginatedPosts.map((post) => (
            <div key={post.id} className="mb-6">
              <PostCard post={post} />
            </div>
          ))}
        </Masonry>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-400">No posts found matching your search</p>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
