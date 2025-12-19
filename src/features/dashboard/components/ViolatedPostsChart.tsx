import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ViolatedPostResponse } from '../types/dashboard.types';

interface ViolatedPostsChartProps {
  posts: ViolatedPostResponse[];
}

export const ViolatedPostsChart: React.FC<ViolatedPostsChartProps> = ({
  posts,
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Bài Viết Vi Phạm Theo Lý Do
        </h3>
        <p className="text-gray-500 text-center py-8">
          Không có dữ liệu vi phạm
        </p>
      </div>
    );
  }

  // Group by reason
  const reasonCounts: Record<string, number> = {};
  posts.forEach((post) => {
    reasonCounts[post.reason] = (reasonCounts[post.reason] || 0) + 1;
  });

  const chartData = Object.entries(reasonCounts).map(([reason, count]) => ({
    reason: reason.length > 25 ? reason.substring(0, 25) + '...' : reason,
    fullReason: reason,
    count,
  }));

  const maxCount = Math.max(...chartData.map((d) => d.count));
  const chartHeight = 280;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        Bài Viết Vi Phạm Theo Lý Do
      </h3>

      <div className="relative" style={{ height: `${chartHeight + 80}px` }}>
        <div className="flex items-end justify-around h-full px-4 pb-16">
          {chartData.map((item, index) => {
            const barHeight = (item.count / maxCount) * chartHeight;
            const isHovered = hoveredBar === index;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 mx-2 relative"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Value label on hover */}
                {isHovered && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
                    <div className="bg-white border-2 border-red-500 rounded-lg shadow-2xl px-4 py-3 min-w-max">
                      <p className="text-xs text-gray-600 mb-1">
                        {item.fullReason}
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {item.count} bài viết
                      </p>
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-red-500" />
                  </div>
                )}

                {/* Bar */}
                <div className="relative w-full perspective-500">
                  <div
                    className={`w-full bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-t-lg transition-all duration-500 cursor-pointer shadow-xl relative overflow-hidden group ${
                      isHovered ? 'scale-105' : ''
                    }`}
                    style={{
                      height: `${barHeight}px`,
                      transformStyle: 'preserve-3d',
                      transform: isHovered ? 'rotateX(-5deg)' : 'rotateX(0deg)',
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Animated glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-700/50 to-transparent animate-pulse" />

                    {/* Count on bar */}
                    <div className="absolute top-2 left-0 right-0 text-center">
                      <span className="text-white font-bold text-lg drop-shadow-lg">
                        {item.count}
                      </span>
                    </div>

                    {/* 3D bottom edge */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-2 bg-red-800 opacity-60"
                      style={{
                        transform: 'translateZ(-5px) rotateX(90deg)',
                        transformOrigin: 'bottom',
                      }}
                    />
                  </div>

                  {/* Shadow */}
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 bg-red-500 opacity-20 blur-lg rounded-full transition-all duration-300 ${
                      isHovered ? 'h-4 opacity-40' : 'h-2'
                    }`}
                  />
                </div>

                {/* Reason label */}
                <div className="absolute -bottom-14 left-0 right-0 text-center px-1">
                  <p
                    className={`text-xs text-gray-700 font-medium transition-all duration-300 ${
                      isHovered ? 'text-red-600 font-bold' : ''
                    }`}
                    style={{
                      wordWrap: 'break-word',
                      lineHeight: '1.2',
                    }}
                  >
                    {item.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis line */}
        <div className="absolute bottom-14 left-4 right-4 h-px bg-gray-300" />
      </div>
    </div>
  );
};
