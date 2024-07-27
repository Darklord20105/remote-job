
/*
  this is home page feed table listing
*/
'use client'
import { useState, useEffect } from 'react';
import { db } from '../../../../lib/firebase/clientApp';
import { collection, getDocs } from "firebase/firestore/lite";
import { getJobList } from "../../../../lib/firebase/firestore";

import FeedItem from '../feedItem/feedItem';
import SearchBar from '../searchBar/searchBar';
import OptionMenu from '../optionMenu/optionMenu';
import RangeBar from '../rangeBar/rangeBar';

import globe from '../../../assets/img/green-globe.svg';
import search from '../../../assets/img/search.svg';
import industry from '../../../assets/img/industry.svg';
import money from '../../../assets/img/money-bag.svg'

const data = [
  {
    id:'001',
    company:'Vera carpenter',
    role:'Database Admin',
    createdAt:'Jan 21,2020',
    logo:null,
    jobClass:'it',
    location: 'worldwide',
    salaryRange: {min: 50, max: 70},
    verified: false,
    hot: false,
    jobType: 'contract',
    tagList: ['developer', 'javascript', 'react', 'backend', 'mongodb'],
    priority: 'high',
  },
  {                                                                             
    id:'002',
    company:'Huddle01',
    role:'Full StackEngineer PHP',
    createdAt:'Jan 15,2020',
    logo:null,
    jobClass: 'it',
    location: 'usa',
    salaryRange: {min: 12, max: 80},
    verified: true,
    hot: false,
    jobType: '',
    tagList: ['developer', 'software', 'test', 'Scala'],
    priority: 'medium',
  },
  {                                                                            
    id:'003',
    company:'Travelshift',
    role:'Senior Go and JavaScript Engineer',
    createdAt:'Jan 11,2020',
    logo:true,
    jobClass: 'it',
    location: 'worldwide',
    salaryRange: {min: 20, max: 200},
    verified: true,
    hot: true,
    jobType: 'contract',
    tagList: ['Golang', 'developer', 'javascript'],
    priority: 'normal',
  },
  {                                                                                   
    id:'004',
    company:'Easy shift',                                                             
    role:'Senior Editor, writer',
    createdAt:'Jan 11,2020',                                                          
    logo:true,
    jobClass: 'writing',
    location: 'worldwide',
    salaryRange: {min: 20, max: 60},                                                    
    verified: true,
    hot: true,
    jobType: '',
    tagList: ['Word', 'Excel', 'creative writing'],                                  
    priority: 'normal',
  },
  {                                                                                   
    id:'005',
    company:'Travel Home',                                                            
    role:'Transcribe ',
    createdAt:'Jan 21,2020',                                                          
    logo: null,
    jobClass: 'writing',
    location: 'worldwide',
    salaryRange: {min: 20, max: 60},                                                   
    verified: true,
    hot: true,
    jobType: 'contract',
    tagList: ['Essay skills', 'communication'],
    priority: 'high',
  },
  {                                                                                   
    id:'006',
    company:'Lorence Eco',                                                           
    role:'Senior Mareketingt Expert',
    createdAt:'Jan 7,2020',                                                          
    logo:true,
    jobClass: 'marketing',
    location: 'worldwide',
    salaryRange: {min: 60, max: 150},                                               
    verified: true,
    hot: true,
    jobType: '',
    tagList: ['overseas', 'campqigns', 'leadership'],
    priority: 'normal',
  },

];

// const utilityClass = 'appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8'
// utilityClass + 'focus:outline-none focus:bg-white focus:border-gray-500'

const searchBarsuggestor = {
  id: 'role',
  title : 'Search',
  options : [
    {oid:'IT jobs'    , val:'it', oicon: globe},
    {oid:'Writing'    , val:'writing', oicon: globe},
    {oid:'Marketing'  , val:'marketing', oicon: globe},
  ],
  icon: search,
  formMode: true
}

const optionMenuLoaction = {
  id: 'location',
  title : 'Location',
  options : [
    {oid:'Worldwide', val:'worldwide', oicon: globe },
    {oid:'USA'      , val:'usa'      , oicon: globe },
    {oid:'Canada'   , val:'canada'   , oicon: globe },
  ],
  icon: globe,
  formMode: false,
}


const optionMenuJobClassFilter = {
  id: 'jobClass',
  title : 'job industry?',
  options : [
    {oid:'IT',        val:'it', oicon: globe},
    {oid:'Writing',   val:'writing', oicon: globe},
    {oid:'Marketing', val:'marketing', oicon: globe},
  ],
  icon: industry,
  formMode: false,
};

const rangeSalarySlider = {
  id: 'salary-range',
  title : 'Salary Range',
  icon: money,
  min: 5,
  max: 40,
  formMode: false,
}

export default function FeedTable() {
  const [ dataList, setDataList ] = useState([]);
  const [ filter, setFilter ] = useState('');
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "jobList"))
      setDataList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    fetchItems()
  } ,[])

  console.log(dataList)

  function filterSearch (myArray, key, property){
    // match letters  like search input 
    let m = myArray.filter(x =>  x[property].includes(key))

    console.log(m)
    return setDataList(m)
  }
  function collectFilterCriteria(filterKey, filterProperty) {
    console.log('collect filter key', filterKey);
    console.log('collect filter property ', filterProperty);
    setDataList([])
    filterSearch(data, filterKey, filterProperty)
  };
  function collectRangeValue(rangeValue) {
    console.log('collect filter key', rangeValue);
    let m = data.filter(x =>  x.salaryRange.min >=  rangeValue);
    console.log(m);
    return setDataList(m)
  }
  
  function resetFilters() {
    console.log('reset filter')
    setDataList(data)
  }
  
  return (
      <div className="mt-8 mx-auto w-full max-w-6xl px-6">
	{/* start utility Bar */}
	<div className="mt-3 flex flex-col sm:flex-row">
	  {/* Search Bar*/}
	  <div className="ml-2 my-1 block relative sm:min-h-max w-48">
	    <SearchBar data={ {...searchBarsuggestor, key: 'role', filter: collectFilterCriteria, reset: resetFilters } }/> 
	  </div>
	  {/* option menu list count filter*/}
	  <div className="ml-2 my-1 block relative sm:min-h-max w-48">
	    <OptionMenu data={ {...optionMenuLoaction, filter: collectFilterCriteria, reset: resetFilters} } />
	  </div>
	  {/* option menu activity filter */}
	  <div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	    <OptionMenu data={ {...optionMenuJobClassFilter, filter: collectFilterCriteria, reset: resetFilters} } />
	  </div>
	  {/* drop down range slider*/}
	  <div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	    <RangeBar data={ {...rangeSalarySlider, filter: collectRangeValue, reset: resetFilters}} />
	  </div>
	</div>
	{/* end utlity Bar */}
	{/* start list items with pagination */}
	<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col">
	  {dataList &&  dataList.map((i) => {
		return <FeedItem key={i.id} data={i} />
	  })}
	</div>
	{/* end list items with pagination */}
	  <button onClick={resetFilters}>reset</button>
      </div>
  )
}
