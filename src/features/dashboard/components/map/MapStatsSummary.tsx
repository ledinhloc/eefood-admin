import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { MapStats } from '@/features/dashboard/types/dashboard.types.ts';

interface MapStatsSummaryProps {
  stats: MapStats;
}

export const MapStatsSummary: React.FC<MapStatsSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <p className="text-xs font-medium text-gray-600">Tổng số</p>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs font-medium text-gray-600 mb-2">Cao nhất</p>
        <p className="text-2xl font-bold text-red-600">{stats.max}</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-xs font-medium text-gray-600 mb-2">Top khu vực</p>
        <p className="text-sm font-bold text-purple-600 truncate">
          {stats.topCity.city || 'N/A'}
        </p>
      </div>
    </div>
  );
};
