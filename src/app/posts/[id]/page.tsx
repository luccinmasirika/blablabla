'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePosts } from '@/hooks/usePosts';

export default function PostDetails() {
  const params = useParams();
  const { posts, isLoading, isError } = usePosts();
  const postId = Number(params.id);

  // Simulate error for post ID 2
  if (postId === 2) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error loading post</div>
          <p className="text-gray-400 mb-4">This post is currently unavailable</p>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          >
            Return to posts
          </Link>
        </div>
      </div>
    );
  }

  const post = posts?.find((p) => p.id === postId);

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

  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Post not found</div>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
          >
            Return to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors duration-300 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to posts
        </Link>

        <article className="bg-[#1a1a1a] rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {post.title.split(' ').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ')}
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {post.body}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between text-sm text-gray-500">
            <span className="text-blue-400">Post #{post.id}</span>
            <span className="text-purple-400">User #{post.userId}</span>
          </div>
        </article>
      </div>
    </main>
  );
}