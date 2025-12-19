// src/features/dashboard/components/Podium3D.tsx
import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import  type { TopUserResponse } from '../types/dashboard.types';

interface Podium3DProps {
  influencers: TopUserResponse[];
}

export const Podium3D: React.FC<Podium3DProps> = ({ influencers }) => {
  const getPodiumConfig = (rank: number) => {
    const configs = {
      1: {
        height: 'h-56',
        gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
        medal: Trophy,
        medalColor: 'text-yellow-300',
        borderColor: 'border-yellow-400',
        order: 'order-2',
        scale: 'scale-110',
        shine: 'from-yellow-300/50 to-transparent',
      },
      2: {
        height: 'h-44',
        gradient: 'from-gray-300 via-gray-400 to-gray-500',
        medal: Award,
        medalColor: 'text-gray-200',
        borderColor: 'border-gray-400',
        order: 'order-1',
        scale: 'scale-100',
        shine: 'from-gray-200/50 to-transparent',
      },
      3: {
        height: 'h-36',
        gradient: 'from-orange-400 via-orange-500 to-orange-600',
        medal: Medal,
        medalColor: 'text-orange-300',
        borderColor: 'border-orange-400',
        order: 'order-3',
        scale: 'scale-95',
        shine: 'from-orange-300/50 to-transparent',
      },
    };
    return configs[rank as keyof typeof configs];
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Top Người Ảnh Hưởng
      </h3>

      <div className="flex justify-center items-end gap-6 px-4">
        {influencers.slice(0, 3).map((influencer, idx) => {
          const rank = idx + 1;
          const config = getPodiumConfig(rank);
          const MedalIcon = config.medal;

          return (
            <div
              key={influencer.userInfo.id}
              className={`flex flex-col items-center ${config.order} transition-all duration-300 hover:scale-105`}
            >
              {/* Avatar with Medal */}
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-xl" />
                <img
                  src={influencer.userInfo.avatarUrl}
                  alt={influencer.userInfo.username}
                  className={`relative w-20 h-20 rounded-full border-4 ${config.borderColor} shadow-2xl object-cover transform group-hover:scale-110 transition-transform duration-300`}
                />
                <div
                  className={`absolute -bottom-2 -right-2 w-11 h-11 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl border-2 border-white transform group-hover:rotate-180 transition-transform duration-500`}
                >
                  <MedalIcon className={`w-6 h-6 ${config.medalColor}`} />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-4 px-2">
                <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                  {influencer.userInfo.username}
                </h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                  {influencer.userInfo.email}
                </p>
                <div className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-700">
                  <span>{influencer.followerCount}</span>
                  <span className="text-xs text-gray-500">followers</span>
                </div>
              </div>

              {/* 3D Podium */}
              <div className="relative perspective-500">
                <div
                  className={`w-32 ${config.height} bg-gradient-to-br ${config.gradient} rounded-t-xl shadow-2xl flex flex-col items-center justify-end pb-4 transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(5deg)',
                  }}
                >
                  {/* Shine effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${config.shine} opacity-50`}
                  />

                  {/* Rank number */}
                  <span className="relative text-white font-bold text-5xl drop-shadow-lg">
                    {rank}
                  </span>

                  {/* 3D edge effect */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b ${config.gradient} opacity-60`}
                    style={{ transform: 'translateZ(-10px)' }}
                  />
                </div>

                {/* Shadow */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-gradient-to-br ${config.gradient} opacity-20 blur-lg rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
