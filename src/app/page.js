'use client'
import { Suspense } from 'react';
import FeedTable from './common/homePage/feedTable/feedTable';
import UtilityBar from './common/homePage/utilityBar/utilityBar';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const queryKey = searchParams.toString();
  console.log(queryKey, 'ttttt');
  
  const queryList = queryKey && queryKey.split('=') || [];
  console.log(queryList, 'query key in home page from url')

  function clearSearch() {
    console.log('clear');
    let m = queryList[0]
    params.delete(m);
    replace(`${pathname}?${params.toString()}`);
  }
  return (
      <div className="mt-8 mx-auto w-full max-w-6xl px-6">
        <UtilityBar query={
	  {queryList: queryList, clearSearch} }/>
        <Suspense key={queryKey} fallback={<h1>loading...</h1>}>
          <FeedTable queryList={queryList} />
        </Suspense>
      </div>  
  )
};
