
/*
  this is home page feed table listing
*/
'use client'
import { useState, useEffect } from 'react';
import { fetchFilteredJobList } from "../../../../lib/firebase/firestore";

import FeedItem from '../feedItem/feedItem';

const dataListx = [                                                                      {
    id:'001',
    company:'Vera carpenter',
    role:'Database Admin',
    createdAt:'Jan 21,2020',                                                          logo:null,
    jobClass:'it',
    location: 'worldwide',
    salaryRange: {min: 50, max: 70},                                                  verified: false,
    hot: false,
    jobType: 'contract',                                                              tagList: ['developer', 'javascript', 'react', 'backend', 'mongodb'],
    priority: 'high',
  },
]

export default async function FeedTable({queryList}) {
  console.log(queryList, 'query key in feed table from url')
  const dataList = await fetchFilteredJobList(queryList)
  console.log(dataList, 'data acquired from firestore')

  if (dataList && dataList.length === 0) return <h1> no results </h1>
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col">
	{ dataList && dataList.map((i) => {
	  return <FeedItem key={i.id} data={i} />
	}) }
    </div>
	
  )
}
