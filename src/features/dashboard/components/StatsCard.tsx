import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
  iconColor,
}) => {
  return (
    <div className="group relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-90`}
      />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />

      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform group-hover:-translate-y-1 transition-all duration-300 border border-white/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-4xl font-bold text-gray-900">{value}</p>
          </div>
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}
          >
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
        </div>

        <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full" />
      </div>
    </div>
  );
};
