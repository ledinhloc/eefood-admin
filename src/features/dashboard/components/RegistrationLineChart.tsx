import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface UserRegistrationStatsResponse {
  date: string;
  totalUsers: number;
}

interface RegistrationLineChartProps {
  data: UserRegistrationStatsResponse[];
}

export const RegistrationLineChart: React.FC<RegistrationLineChartProps> = ({
  data,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <p className="text-gray-500 text-center text-sm">Không có dữ liệu</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.totalUsers));
  const chartHeight = 180;
  const chartWidth = 600;
  const padding = { left: 50, right: 30, top: 20, bottom: 40 };

  const getX = (index: number) =>
    padding.left +
    (index * (chartWidth - padding.left - padding.right)) / (data.length - 1);

  const getY = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-500" />
        Đăng Ký Gần Đây (7 Ngày)
      </h3>

      <div className="relative">
        <svg
          width="100%"
          height="280"
          viewBox={`0 0 ${chartWidth + 40} ${chartHeight + padding.top + padding.bottom + 20}`}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={padding.top + (i * chartHeight) / 4}
                x2={chartWidth + padding.left}
                y2={padding.top + (i * chartHeight) / 4}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={padding.top + (i * chartHeight) / 4 + 5}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {Math.round(maxValue - (i * maxValue) / 4)}
              </text>
            </g>
          ))}

          {/* Area under line */}
          <path
            d={`
              M ${getX(0)} ${getY(data[0].totalUsers)}
              ${data.map((d, i) => `L ${getX(i)} ${getY(d.totalUsers)}`).join(' ')}
              L ${getX(data.length - 1)} ${padding.top + chartHeight}
              L ${getX(0)} ${padding.top + chartHeight}
              Z
            `}
            fill="url(#lineGradient)"
          />

          {/* Main line */}
          <path
            d={`
              M ${getX(0)} ${getY(data[0].totalUsers)}
              ${data.map((d, i) => `L ${getX(i)} ${getY(d.totalUsers)}`).join(' ')}
            `}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points and tooltips */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.totalUsers);
            const isHovered = hoveredPoint === i;

            return (
              <g key={i}>
                {/* Tooltip - render trước để không chặn hover */}
                {isHovered && (
                  <g pointerEvents="none">
                    <rect
                      x={x - 50}
                      y={y - 55}
                      width="100"
                      height="40"
                      rx="8"
                      fill="white"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      filter="url(#glow)"
                    />
                    <text
                      x={x}
                      y={y - 38}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-gray-700"
                    >
                      {new Date(d.date).toLocaleDateString('vi-VN')}
                    </text>
                    <text
                      x={x}
                      y={y - 22}
                      textAnchor="middle"
                      className="text-base font-bold fill-blue-600"
                    >
                      {d.totalUsers} người dùng
                    </text>
                  </g>
                )}

                {/* Hover area - invisible circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="25"
                  fill="transparent"
                  style={{ pointerEvents: 'all' }}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                />

                {/* Visible point */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '6' : '4'}
                  fill="white"
                  stroke="#3b82f6"
                  strokeWidth={isHovered ? '3' : '2'}
                  style={{ pointerEvents: 'none' }}
                  className="transition-all duration-150"
                />

                {/* Date label */}
                <text
                  x={x}
                  y={padding.top + chartHeight + 30}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                  style={{ pointerEvents: 'none' }}
                >
                  {new Date(d.date).getDate()}/{new Date(d.date).getMonth() + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
