import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useSearchFilter = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  // Helper function to prevent duplicate filters
  const preventDuplicateFilter = useCallback((arr) => {
    return [...new Set(arr)];
  }, []);

  // Function to handle search and update query parameters
  const handleSearch = useCallback((term) => {
    let previousTerm = params.getAll('filter') || [];

    if (previousTerm.length > 0) {
      // Remove the existing 'filter' param
      params.delete('filter');

      // Merge new term with existing terms and remove duplicates
      let mergedTerms = [...previousTerm.join("").split(" "), term];
      let uniqueTerms = preventDuplicateFilter(mergedTerms);

      // Create the new filter string and update the URL
      let newTerm = uniqueTerms.join(' ');
      params.append('filter', newTerm);
    } else {
      // If no previous filter exists, just add the new term
      params.append('filter', term);
    }

    // Replace the current URL with the updated query params
    replace(`/?${params.toString()}`);
  }, [params, preventDuplicateFilter, replace]);

  return { handleSearch };
};
