'use client'
import {
  useState,
  useEffect,
  useCallback,
  createContext 
} from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function DropdownSvg() {
  return(
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd"  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
    </svg>
  )
};

export function SearchBarClassy({handleSearch}) {
  const searchParams = useSearchParams();
  return (
      <input
        className={utilityBarClasses.dropDownSearchInput}
        placeholder='type here to search'                                                 
	 onChange={(e) => { handleSearch(e.target.value); }}
         // defaultValue={searchParams.get('filter')?.toString()}
      />
  );
}

export const DropdownContext = createContext('light');

// this function serves as the default interface for the dropdown menu - what gets rendered on first page load - 

function MainDropdown(
  { data: { value, toggleDropdown,  handleSearch, 
	   objectProps :{id, title, formMode, action, icon} } }
){
  
  return (
    <button type="button" 
	  className={utilityBarClasses.dropDownButton} onClick={toggleDropdown} >
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
	<Image
          {...icon}
          priority
	  alt={id}
	  className={utilityBarClasses.dropDownItemContentImage}
	/>
	{/* 
	  formMode is a Boolean to show search bar input with suggestions 
	  as drop down menu list,
	  when you type something or select an option
	  an action is triggered like fetching specific posts
	*/}
	{formMode ? 
	   <SearchBarClassy handleSearch={handleSearch} />
	 : <span className={utilityBarClasses.dropDownTitleWrapper}>{value ? value: title}</span>}
      </span>                                                                     
      <span className={utilityBarClasses.dropDownIcon}>
	  <DropdownSvg />
       </span>                                                                   
    </button>)
}


// The main reason for this component was to make a dropdown menu wrapper for all 
// possible forms in this project such as option menu, search, range slider, where
// this component handles all the logic 
// it now fully supports option menu with dropdown of option items
// it now fully supports option menu with dropdown of range slider item
// it now fully supports serch menu with dropdown of suggestion option items using formMode Boolean

export default function DropdownWrapper({ children }) {
  // since this is a Form like component we need to capture a value STRING
  const [value, setValue] = useState('');

  // props used in dropdown default interface, typically it is used to send data from dropdown child components up to MainDropdown component
  const [objectProps, setObjectProps] = useState({});

  // new handle search with url params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // this function is used to to send query params into url
  
  const handleOption = (term) => {
    const ba = searchParams.toString();
    const params = new URLSearchParams(searchParams);

    if (ba.length > 0) {
      let a = ba.split('=')
      let b = a[0];
      params.delete(b);
    }

    if (term) {
      params.append('sort-by', term);
    } else {
      params.delete('sort-by');
    }

    replace(`${pathname}?${params.toString()}`);
    closeDropdown()
  }

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);

    function preventDuplicateFilter(arr) {
      let a = new Set(arr);
      return [...a]                                                                  
    };
    
    let previousTerm = params.getAll('filter') || [];
                                                                                      
    // if we have a previous item we need to merge our new term
    // first we need to delete our old filter and make new merged one                
    // // it was quite hard to do this                                                   
    // // PLEASE DON'T CHANGE UNLESS YOU KNOW WHAT TO DO !!!
    if (previousTerm.length > 0) {
      // if we have already a param in url delete it
      params.delete('filter');
      console.log(previousTerm, "before push new param");

      let a = previousTerm.join("").split(" ");
      console.log("try to fix before", a);
      a.push(term);
      let b = preventDuplicateFilter(a);
      console.log("try fixing stage 2", b);

      let newTerm = b.join(' ');
      params.append('filter', newTerm);
    } else {                                                                           
      params.append('filter', term);
    }
    
    replace(`${pathname}?${params.toString()}`);
    closeDropdown()
  }

  /* MENU Functions show hide */
  // open menu status BOOLEAN
  const [isOpen, setIsOpen] = useState(false);

  // a function used to toggle the menu between show and hide
  const toggleDropdown = () =>  setIsOpen(!isOpen);

  // a function used to close the menu
  const closeDropdown = () =>  setIsOpen(false);

  useEffect(() =>  console.log(value, 'effect root level'), [value] )

  return(
    <DropdownContext 
       value={{value, isOpen, setValue, handleSearch, handleOption,
	 closeDropdown, objectProps, setObjectProps 
       }}>
      <MainDropdown 
	data={{value, toggleDropdown, objectProps, handleSearch }}
      />
      {children}
    </DropdownContext>
  )
};
