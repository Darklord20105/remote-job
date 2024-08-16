import { useMemo } from 'react';

export function useSortData(data = [], sortKey, sortOrder = 'asc') {
  const sortedData = useMemo(() => {
    if (!data || !sortKey) return data;

    const sortedArray = [...data].sort((a, b) => {
      // Handle different types of sort keys
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      // Handle nested keys (e.g., 'address.city')
      if (sortKey.includes('.')) {
        const keys = sortKey.split('.');
        aValue = keys.reduce((acc, key) => acc[key], a);
        bValue = keys.reduce((acc, key) => acc[key], b);
      }

      // Handle Date objects or date strings
      if (aValue instanceof Date || !isNaN(Date.parse(aValue))) {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Comparison logic
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedArray;
  }, [data, sortKey, sortOrder]);

  return sortedData;
}
