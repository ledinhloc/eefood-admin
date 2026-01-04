import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Users } from 'lucide-react';
import { Layer } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MapUpdater } from './MapUpdater';
import { MapTooltip } from './MapTooltip';
import { MapStatsSummary } from './MapStatsSummary';
import { MapLegend } from './MapLegend';
import type { DisplayData, MapStats, ProvinceFeature, ProvinceStyle, VietnamUserMapProps } from '@/features/dashboard/types/dashboard.types.ts';
import { getColor, normalizeCity } from '@/utils/normalizeCity.ts';
import { vietnamGeoJSON } from '@/features/dashboard/types/geoJson.data.ts';


export const VietnamUserMap: React.FC<VietnamUserMapProps> = ({
  cityStatistics = [],
}) => {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // Tạo map data từ cityStatistics
  const cityDataMap = useMemo(() => {
    const map = new Map<string, number>();
    cityStatistics.forEach((stat) => {
      const normalized = normalizeCity(stat.city as string);
      map.set(normalized, stat.totalUsers);
    });
    return map;
  }, [cityStatistics]);

  // Tính toán stats
  const stats = useMemo<MapStats>(() => {
    const total = cityStatistics.reduce(
      (sum, stat) => sum + stat.totalUsers,
      0
    );
    const max = Math.max(...cityStatistics.map((s) => s.totalUsers), 0);
    const topCity = cityStatistics.reduce(
      (prev, current) =>
        current.totalUsers > prev.totalUsers ? current : prev,
      { city: '', totalUsers: 0 }
    );

    return {
      total,
      max,
      topCity: { city: topCity.city as string, totalUsers: topCity.totalUsers },
    };
  }, [cityStatistics]);

  // Style cho từng province
  const style = useCallback(
    (feature: ProvinceFeature | undefined): ProvinceStyle => {
      if (!feature) {
        return {
          fillColor: '#e5e7eb',
          weight: 1,
          opacity: 1,
          color: '#94a3b8',
          fillOpacity: 0.6,
        };
      }

      const normalized = normalizeCity(feature.properties.name);
      const users = cityDataMap.get(normalized) || 0;
      const isHovered = hoveredProvince === feature.properties.name;
      const isSelected = selectedProvince === feature.properties.name;

      return {
        fillColor: getColor(users, stats.max),
        weight: isSelected ? 3 : isHovered ? 2 : 1,
        opacity: 1,
        color: isSelected ? '#1e40af' : isHovered ? '#3b82f6' : '#94a3b8',
        fillOpacity: isHovered || isSelected ? 0.8 : 0.6,
      };
    },
    [cityDataMap, hoveredProvince, selectedProvince, stats.max]
  );

  // Event handlers
  const onEachFeature = useCallback(
    (feature: ProvinceFeature, layer: Layer) => {
      layer.on({
        mouseover: (e) => {
          setHoveredProvince(feature.properties.name);
          const target = e.target;
          target.setStyle({
            weight: 2,
            fillOpacity: 0.8,
          });
        },
        mouseout: (e) => {
          setHoveredProvince(null);
          const target = e.target;
          target.setStyle({
            weight: selectedProvince === feature.properties.name ? 3 : 1,
            fillOpacity:
              selectedProvince === feature.properties.name ? 0.8 : 0.6,
          });
        },
        click: () => {
          setSelectedProvince(feature.properties.name);
        },
      });
    },
    [selectedProvince]
  );

  const displayProvince = selectedProvince || hoveredProvince;
  const displayData: DisplayData | null = displayProvince
    ? {
        name: displayProvince,
        users: cityDataMap.get(normalizeCity(displayProvince)) || 0,
      }
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Thống Kê Theo Khu Vực
            </h3>
            <p className="text-blue-100 text-sm">
              Phân bố người dùng trên toàn quốc
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <MapStatsSummary stats={stats} />

      {/* Map Container */}
      <div className="relative" style={{ height: '500px' }}>
        <MapContainer
          center={[16.0, 106.0]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <MapUpdater center={[16.0, 106.0]} zoom={6} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={vietnamGeoJSON}
            style={(feature) => style(feature as ProvinceFeature)}
            onEachFeature={(feature, layer) =>
              onEachFeature(feature as ProvinceFeature, layer)
            }
          />
        </MapContainer>

        {/* Hover Tooltip */}
        {displayData && (
          <MapTooltip
            displayData={displayData}
            totalUsers={stats.total}
            maxUsers={stats.max}
          />
        )}
      </div>

      {/* Legend */}
      <MapLegend />
    </div>
  );
};
