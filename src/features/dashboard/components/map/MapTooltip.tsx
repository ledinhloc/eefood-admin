import React from 'react';
import { Users } from 'lucide-react';
import type { DisplayData } from '@/features/dashboard/types/dashboard.types.ts';
import { getColor } from '@/utils/normalizeCity.ts';

interface MapTooltipProps {
  displayData: DisplayData;
  totalUsers: number;
  maxUsers: number;
}

export const MapTooltip: React.FC<MapTooltipProps> = ({
  displayData,
  totalUsers,
  maxUsers,
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-xl shadow-2xl p-4 border-2 border-blue-500 z-[1000] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">{displayData.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              {displayData.users}
            </span>
            <span className="text-sm text-gray-600">người dùng</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getColor(displayData.users, maxUsers),
                }}
              />
              <span>
                {((displayData.users / totalUsers) * 100).toFixed(1)}% tổng số
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
