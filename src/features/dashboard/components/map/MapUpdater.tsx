import type { MapUpdaterProps } from '@/features/dashboard/types/dashboard.types.ts';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';


export const MapUpdater: React.FC<MapUpdaterProps> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};
