import SearchDropDownWrapper from './searchBar/searchSimple';
import OptionMenu from './optionMenu/optionMenu';
import { KeyBox, KeyBoxClearAll } from './keyBox/keyBox';
import { SearchSvgX, ToolsSvg } from '../../svg';
import globe from '../../../assets/img/green-globe.svg';
// import search from '../../../assets/img/search.svg';
// import industry from '../../../assets/img/industry.svg';

const searchBarsuggestor = {
  id: 'search',
  placeholder: 'type here to search',
  options: [
    { oid: 'car', val: 'car', oicon: globe },
    { oid: 'test', val: 'test', oicon: globe },
    { oid: 'driver', val: 'driver', oicon: globe },
    { oid: 'lord', val: 'lord', oicon: globe },
  ],
  Icon: <SearchSvgX />,
  formMode: true
};

const optionMenuSortBy = {
  id: 'sortBy',
  title: 'Sort By',
  options: [
    { oid: 'Role desc', val: 'position&desc', oicon: globe },
    { oid: 'Role asc', val: 'position&asc', oicon: globe },
    { oid: 'Company desc', val: 'company&desc', oicon: globe },
    { oid: 'Company asc', val: 'company&asc', oicon: globe },
    { oid: 'By Date desc', val: 'createdAt&desc', oicon: globe },
    { oid: 'By Date asc', val: 'createdAt&asc', oicon: globe },
  ],
  Icon: <ToolsSvg />,
  formMode: false,
}


export default function UtilityBar({ query:
  { queryList, resultCount, clearSearch, clearOneCriteria }
}) {
  console.log(queryList, ' query in utility bar')
  return (
    <>
      <div className="mt-3 flex flex-col sm:flex-row">
        {/* Search Bar*/}
        <div className="ml-2 my-1 block relative sm:min-h-max w-64">
          <SearchDropDownWrapper data={{ ...searchBarsuggestor }} />
        </div>
        <div className="ml-2 my-1 block relative sm:min-h-max w-64">
          <OptionMenu data={{ ...optionMenuSortBy }} />
        </div>
      </div>
      {/* search criteria show on UI*/}
      <div className='ml-2 my-1 block flex relative sm:min-h-max w-full'>
        {queryList.map(item => {
          return <KeyBox key={item} query={{ queryKey: item, clearOneCriteria }} />
        })}
        {queryList.length > 0 &&
          <KeyBoxClearAll query={{
            queryKey: 'Clear All', resultCount: resultCount, clearSearch
          }} />
        }
      </div>
    </>
  )
}

{/* 

const optionMenuLoaction = {
  id: 'location',
  title: 'Location',
  options: [
    { oid: 'Worldwide', val: 'worldwide', oicon: globe },
    { oid: 'USA', val: 'usa', oicon: globe },
    { oid: 'Canada', val: 'canada', oicon: globe },
  ],
  icon: globe,
  formMode: false,
}

const optionMenuJobClassFilter = {
  id: 'jobClass',
  title: 'job industry?',
  options: [
    { oid: 'IT', val: 'it', oicon: globe },
    { oid: 'Writing', val: 'writing', oicon: globe },
    { oid: 'Marketing', val: 'marketing', oicon: globe },
  ],
  icon: industry,
  formMode: false,
};

const rangeSalarySlider = {
  id: 'salaryRange',
  title: 'Salary Range',
  icon: money,
  min: 5,
  max: 40,
  formMode: false,
}
/// option menu location filter 
<div className="ml-2 my-1 block relative sm:min-h-max w-48">
	<OptionMenu data={{...optionMenuLoaction}} />
</div>
// option menu activity filter
<div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	<OptionMenu data={{...optionMenuJobClassFilter}} />
</div>
// drop down range slider
<div className='ml-2 my-1 block relative sm:min-h-max w-48'>
	<RangeBar data={{...rangeSalarySlider}} />
</div>
*/}
