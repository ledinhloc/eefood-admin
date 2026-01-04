export const normalizeCity = (city: string): string => {
  const normalized = city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/thành phố /gi, '')
    .replace(/tỉnh /gi, '')
    .trim();

  return normalized;
};

export const getColor = (users: number, max: number): string => {
  if (!users || users === 0) return '#e5e7eb';
  const ratio = users / max;
  if (ratio > 0.7) return '#dc2626';
  if (ratio > 0.5) return '#f97316';
  if (ratio > 0.3) return '#fbbf24';
  if (ratio > 0.1) return '#34d399';
  return '#60a5fa';
};

export const COLOR_LEGEND = [
  { color: '#e5e7eb', label: 'Không có dữ liệu' },
  { color: '#60a5fa', label: 'Rất thấp' },
  { color: '#34d399', label: 'Thấp' },
  { color: '#fbbf24', label: 'Trung bình' },
  { color: '#f97316', label: 'Cao' },
  { color: '#dc2626', label: 'Rất cao' },
];
