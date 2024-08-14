'use client';
import { useFetchData } from '../../hooks/useFetchData';
import { fetchFilteredJobList } from "../../../../lib/firebase/data";
import FeedItem from '../feedItem/feedItem';

export default function FeedTable({ query : 
  { queryList, sortKey, collectResultCount } 
}) {
  console.log(queryList, 'query key in feed table from url')
  const { data: dataList, error, loading } = useFetchData(
    fetchFilteredJobList, queryList );
  if (loading) {
    return <div>Loading...</div>;
  };
  // console.log(error)
  if (error) {
    return <div>Error: {error} Try using a proxy</div>;
  };
  console.log(dataList)
  collectResultCount(dataList.length)
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col">
      {dataList.length > 0 && dataList.map((i) => {
        return <FeedItem key={i.id} data={i} />
      })}
    </div>

  )
}
