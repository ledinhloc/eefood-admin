import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Mật độ người dùng:
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Thấp</span>
          <div className="flex gap-1">
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#e5e7eb' }}
            />
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#60a5fa' }}
            />
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#34d399' }}
            />
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#fbbf24' }}
            />
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#f97316' }}
            />
            <div
              className="w-6 h-4 rounded"
              style={{ backgroundColor: '#dc2626' }}
            />
          </div>
          <span className="text-xs text-gray-500">Cao</span>
        </div>
      </div>
    </div>
  );
};
