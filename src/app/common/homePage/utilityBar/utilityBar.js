import SearchBar from './searchBar/searchBar';
import OptionMenu from './optionMenu/optionMenu';
import RangeBar from './rangeBar/rangeBar';
import KeyBox from './keyBox/keyBox';

import globe from '../../../assets/img/green-globe.svg';
import search from '../../../assets/img/search.svg';
import industry from '../../../assets/img/industry.svg';
import money from '../../../assets/img/money-bag.svg'

// VIP NOTE
// Typically we must pass the id to match a field in jobList collection for option menu bar
//
const searchBarsuggestor = {
  id: 'role',
  title : 'Search',
  options : [
    {oid:'react'    , val:'react', oicon: globe},
    {oid:'Writing'    , val:'writing', oicon: globe},
    {oid:'Marketing'  , val:'marketing', oicon: globe},
  ],
  icon: search,
  formMode: true
};

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
  id: 'salaryRange',                                                         
  title : 'Salary Range',
  icon: money,                                                                
  min: 5,                                                                     
  max: 40,
  formMode: false,
}

export default function UtilityBar({query : { queryList, clearSearch}}) {
  console.log(queryList, '23333333333333333/')  
  return (
	<div className="mt-3 flex flex-col sm:flex-row">
          {/* Search Bar*/}
          <div className="ml-2 my-1 block relative sm:min-h-max w-48">
            <SearchBar data={{...searchBarsuggestor }}/>
          </div>
          {/* option menu location filter*/}
          <div className="ml-2 my-1 block relative sm:min-h-max w-48">
	    <OptionMenu data={{...optionMenuLoaction}} />
          </div>
          {/* option menu activity filter */}
          <div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	    <OptionMenu data={{...optionMenuJobClassFilter}} />
          </div>
          {/* drop down range slider*/}
          <div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	    <RangeBar data={{...rangeSalarySlider}} />
          </div>
	  {/* search criteria show on UI*/}
	  <div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	  {
	    queryList.length > 0 && 
	      <KeyBox query={ {queryList: queryList, clearSearch} } />
	  }
          </div>
        </div>
  )
}
