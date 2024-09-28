'use client';
import { useFetchData } from '../../hooks/useFetchData';
import { useSortData } from '../../hooks/useSortData';
import { fetchFilteredJobList } from "../../../../lib/firebase/data";
import FeedItem from '../feedItem/feedItem';
import FeedItemSkeleton from '../feedItem/feedItemSkeleton';
import { useEffect } from 'react';

export default function FeedTable({ query : 
  { queryList, sortKey, sortDirection, collectResultCount } 
}) {
  
  console.log(queryList, 'query key in feed table from url')
  const { data: dataList, error, loading, fetchMore, hasMore, lastItem } = useFetchData(
    fetchFilteredJobList, queryList );

  const sortedDataList = useSortData( dataList || [], sortKey, sortDirection);
  useEffect(() => {
    dataList && collectResultCount(dataList.length);
  }, [dataList]);

  let m = Array(10).fill({});
  if (loading) {
    return <>{m.map( (index, item) => <FeedItemSkeleton key={`${index} + 1`} />)}</>;
  };
  if (error) {
    return <div>Error: {error} Try using a proxy </div>;
  };

  let loadMorestyle = hasMore ? 'cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-500 hover:bg-gradient-to-l' : 'bg-indigo-200 cursor-not-allowed';
   
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col">
      {sortedDataList.map((i) => {
        return <FeedItem key={i.id} data={i} />
      })}
      
      {(queryList.length ===  0 ) &&  
	<button 
	  type='button' 
	  className={'mt-4 py-2.5 px-6 text-sm rounded-full text-white font-semibold text-center shadow-xs transition-all duration-500 '+loadMorestyle}
	  onClick={fetchMore} 
	  disabled={!hasMore || loading}
	  >{!hasMore ? 'No more data' : 'Load More'}
	</button>}
    </div>
  )
}
