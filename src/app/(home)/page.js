'use client'
import { Suspense, useContext } from 'react';
import { ContextProvider } from './wrapper';
import FeedTable from '../common/homePage/feedTable/feedTable';

export default function HomePage() {
  const {
    queryList,
    sortKey,
    sortDirection,
    collectResultCount,
  } = useContext(ContextProvider);

  return (
    <Suspense key={'manga'} fallback={<h1>loading...</h1>}>
      <FeedTable query={{
        queryList: queryList,
        sortKey: sortKey,
        sortDirection: sortDirection,
        collectResultCount
      }}
      />
    </Suspense>
  )
};
