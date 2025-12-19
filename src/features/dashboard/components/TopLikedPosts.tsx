import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';
import type { TopPostResponse } from '../types/dashboard.types';

interface TopLikedPostsProps {
  posts: TopPostResponse[];
}

export const TopLikedPosts: React.FC<TopLikedPostsProps> = ({ posts }) => {
  const getRankColor = (rank: number) => {
    const colors = [
      { bg: 'from-red-500 to-pink-500', text: 'text-red-600' },
      { bg: 'from-orange-500 to-yellow-500', text: 'text-orange-600' },
      { bg: 'from-yellow-500 to-amber-500', text: 'text-yellow-600' },
      { bg: 'from-green-500 to-emerald-500', text: 'text-green-600' },
      { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-600' },
    ];
    return colors[rank] || colors[4];
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        Bài Viết Có Nhiều Lượt Thích
      </h3>

      <div className="space-y-4">
        {posts.slice(0, 5).map((post, idx) => {
          const { bg, text } = getRankColor(idx);
          const isTopThree = idx < 3;

          return (
            <div
              key={post.postId}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl"
            >
              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${bg} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
              />

              <div className="relative flex items-center gap-4 p-4">
                {/* Rank Badge */}
                <div className="flex-shrink-0 relative">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}
                  >
                    <span className="text-white font-bold text-xl">
                      #{idx + 1}
                    </span>
                  </div>
                  {isTopThree && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Post Image */}
                <div className="flex-shrink-0 relative group/img">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-24 h-24 object-cover transform group-hover/img:scale-110 transition-transform duration-500 shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* 3D shadow effect */}
                  <div
                    className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-lg bg-gradient-to-br ${bg} opacity-20 blur-sm -z-10`}
                  />
                </div>

                {/* Post Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-gray-800 text-base mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-500 transition-all duration-300">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <img
                      src={post.userInfo.avatarUrl}
                      alt={post.userInfo.username}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <p className="text-sm text-gray-600 truncate">
                      {post.userInfo.username}
                    </p>
                  </div>
                </div>

                {/* Like Count */}
                <div className="flex-shrink-0 text-right">
                  <div
                    className={`relative inline-flex flex-col items-center px-5 py-3 rounded-xl bg-gradient-to-br ${bg} shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <Heart className="w-5 h-5 text-white fill-white mb-1" />
                    <span className="text-2xl font-bold text-white">
                      {post.count}
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      likes
                    </span>
                  </div>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
