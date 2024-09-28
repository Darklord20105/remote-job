import { useState, useEffect, useCallback, useRef, useMemo } from 'react';


// works on intial fetch and with querylist filters
export const useFetchDataSingle = (fetchFunction, params) => {
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
/////////

/*
// works on intial fetch and with querylist filters but seriously messed up on fetch more
export const useFetchDatab = (fetchFunction, initialQueryList) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState(null); // To track the last document fetched
  const [hasMore, setHasMore] = useState(true); // To indicate if more data is available

  const lastItemRef = useRef(null)
  lastItemRef.current = lastItem;

  // Fetch data (either initial or additional)
  const fetchData = async (params, reset = false) => {
    if (loading) return; // Prevents triggering multiple requests simultaneously
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      alert('outside');
      const result = await fetchFunction(params);

      if (result.message) {
        setError(result.message); // Handle specific error message
      } else {
	if(reset) {
	  setData(result); // Replace data for initial fetch
	} else {
	  setData(prevState => [...prevState, ...result] )
	} 
	if (result.length > 0) {
          setLastItem(result[result.length - 1]); // Update the last item for pagination
	}
        setHasMore(result.length > 0); // Determine if there is more data
      }
    } catch (err) {
	setError('Failed to fetch data'); // Handle general errors
    } finally {
	setLoading(false);
    }
  }

  // Initial data fetch (only runs once unless initialParams change)
  useEffect(() => {
    fetchData(initialQueryList, true);
  }, [initialQueryList]);

  // Function to fetch more posts based on the last fetched document
  const fetchMore = () => {
    if (!loading && hasMore) {
      fetchData(initialQueryList,  false); // Fetch more data based on current params and lastItem
    }
  };

  return { data, error, loading, fetchMore, hasMore, lastItem };
};
*/

/*
  this hook can be used for fetching single item or list of items
*/
export const useFetchData = (fetchFunction, initialParams) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState(null); // To track the last document fetched
  const [hasMore, setHasMore] = useState(true); // To indicate if more data is available

  const lastItemRef = useRef(null);
  const queryRef = useRef(initialParams); // To store the initial query list when trying to load list of items from db

  lastItemRef.current = lastItem;

  // Fetch data (either initial or additional)
  const fetchData = async (params, reset= false) => {
    if (loading) return; // Prevents triggering multiple requests simultaneously
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const result = await fetchFunction(params, lastItemRef.current);
      if (result.message) {
        setError(result.message); // Handle specific error message
      } else {
	if(reset) { 
	  setData(result) 
	} else {
	  result.shift();
          setData(prevState => [...prevState, ...result]); // Replace data for initial fetch
	}
        if (result.length > 0) {
          setLastItem(result[result.length - 1]); // Update the last item for pagination
        }
        setHasMore(result.length > 0); // Determine if there is more data
      }
    } catch (err) {
        setError('Failed to fetch data'); // Handle general errors
    } finally {
        setLoading(false);
    }
  }

  // Initial data fetch (only runs once unless initialParams change)
  useEffect(() => {
    fetchData(initialParams, true);
  }, []);

  const equalsCheck = (a, b) => {
    if (a.length !== b.length) return false;
    return JSON.stringify(a) === JSON.stringify(b);
  }
  useEffect(() => {
    // Ignore the initial mount trigger
    if (!equalsCheck(queryRef.current, initialParams) ) {
      setLastItem(null)
      lastItemRef.current = null
      fetchData(initialParams, true);
      queryRef.current = initialParams; // Update the stored query
    }
  }, [initialParams]);
	
  const fetchMore = () => {
    if (!loading && hasMore) {
      fetchData(initialParams,  false); // Fetch more data based on current params and lastItem
    }
  };

  return { data, error, loading, hasMore, fetchMore, lastItem };
};

