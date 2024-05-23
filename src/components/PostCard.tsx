import { Post } from '@/types/post';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

const capitalizeTitle = (title: string) => {
  return title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function PostCard({ post }: PostCardProps) {
  const isErrorPost = post.id === 2;

  return (
    <Link href={`/posts/${post.id}`} className="block">
      <div className={`group relative bg-[#1a1a1a] rounded-xl p-6 transition-all duration-300 hover:bg-[#242424] hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 cursor-pointer ${isErrorPost ? 'border-2 border-red-500/50' : ''}`}>
        {isErrorPost && (
          <div className="absolute top-2 right-2 bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
            Click to see error page
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {capitalizeTitle(post.title)}
          </h2>
          <p className="text-gray-400 line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {post.body}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="group-hover:text-blue-400 transition-colors duration-300">
              Post #{post.id}
            </span>
            <span className="group-hover:text-purple-400 transition-colors duration-300">
              User #{post.userId}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}