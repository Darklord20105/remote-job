import { useState, useEffect } from 'react';

export const useFetchData = (fetchFunction, params) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const result = await fetchFunction(params);
        if (result.message) {
          setError(result.message); // Handle specific error message
        } else {
          setData(result);
        }
      } catch (err) {
        setError('Failed to fetch data'); // Handle general errors
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, params]);

  return { data, error, loading };
};

