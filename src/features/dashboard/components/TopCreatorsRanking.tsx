import { Award, TrendingUp } from 'lucide-react';
import React from 'react';

interface TopUserPostResponse {
  userInfo: {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
  };
  postCount: number;
}

interface TopCreatorsRankingProps {
  creators: TopUserPostResponse[];
}

export const TopCreatorsRanking: React.FC<TopCreatorsRankingProps> = ({
  creators,
}) => {
  const getRankGradient = (rank: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
    ];
    return gradients[rank] || 'from-gray-500 to-gray-700';
  };

  const getRankColor = (rank: number) => {
    const colors = [
      'text-purple-600',
      'text-blue-600',
      'text-green-600',
      'text-orange-600',
      'text-indigo-600',
    ];
    return colors[rank] || 'text-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-500" />
        Top Người Đóng Góp Bài Viết
      </h3>

      <div className="space-y-3">
        {creators.map((creator, idx) => {
          const gradient = getRankGradient(idx);
          const textColor = getRankColor(idx);
          const isTopThree = idx < 3;

          return (
            <div
              key={creator.userInfo.id}
              className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-200`}
              />

              <div className="relative flex items-center gap-3 p-3">
                {/* Rank Badge */}
                <div className="flex-shrink-0 relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md transform group-hover:scale-105 transition-all duration-200`}
                  >
                    <span className="text-white font-bold text-lg">
                      #{idx + 1}
                    </span>
                  </div>
                  {isTopThree && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                      <TrendingUp className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={creator.userInfo.avatarUrl}
                      alt={creator.userInfo.username}
                      className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover transform group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5 truncate">
                    {creator.userInfo.username}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {creator.userInfo.email}
                  </p>
                </div>

                {/* Post Count - Fixed styling */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col items-center justify-center px-4 py-2 rounded-lg bg-white border-2 border-gray-100 group-hover:border-gray-200 transition-all duration-200">
                    <span className={`text-2xl font-bold ${textColor}`}>
                      {creator.postCount}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      bài viết
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
