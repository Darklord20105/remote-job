'use client'
import {
  useState,
  useEffect,
  createContext
} from 'react';
import { utilityBarClasses } from '../../../../constants/classes';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { DropdownSvg } from '../../../svg';


export const DropdownContext = createContext('light');

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
  const params = new URLSearchParams(searchParams);

  function preventDuplicateFilter(arr) {
    let a = new Set(arr);
    return [...a]
  };

  // this function is used to to send query params into url

  const handleOption = (term) => {
    setValue(term)
    let previousTerm = params.getAll('sort-by') || [];

    // if we have a previous item we need to merge our new term
    // first we need to delete our old filter and make new merged one
    // it was quite hard to do this                        
    // // PLEASE DON'T CHANGE UNLESS YOU KNOW WHAT TO DO !!!
    if (previousTerm.length > 0) {
      // if we have already a param in url delete it
      params.delete('sort-by');
      console.log(previousTerm, "before push new param");

      let a = previousTerm.join("").split(" ");
      console.log("try to fix before", a);

      let newTerm = term
      params.append('sort-by', newTerm);
    } else {
      params.append('sort-by', term);
    }

    replace(`${pathname}?${params.toString()}`);
    closeDropdown()
  }

  const handleSearch = (term) => {
    let previousTerm = params.getAll('filter') || [];

    // if we have a previous item we need to merge our new term
    // first we need to delete our old filter and make new merged one
    // it was quite hard to do this                        
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
  const toggleDropdown = () => setIsOpen(!isOpen);

  // a function used to close the menu
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => console.log(value, 'effect root level'), [value])

  return (
    <DropdownContext
      value={{
        value, isOpen, setValue, handleSearch, handleOption,
        closeDropdown, objectProps, setObjectProps
      }}>
      <MainDropdown
        data={{ value, toggleDropdown, objectProps, handleSearch }}
      />
      {children}
    </DropdownContext>
  )
};

// this function serves as the default interface for the dropdown menu - what gets rendered on first page load - 

function MainDropdown(
  { data: { value, toggleDropdown, handleSearch,
    objectProps: { id, title, formMode, Icon, options } } }
) {
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton} onClick={toggleDropdown} >
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>

        <span className={utilityBarClasses.dropDownItemContentImage}>{Icon}</span>
        {/* 
	  formMode is a Boolean to show search bar input with suggestions 
	  as drop down menu list,
	  when you type something or select an option
	  an action is triggered like fetching specific posts
	*/}
        {formMode ?
          <SearchBarClassy props={{options, handleSearch}} />
          : <span className={utilityBarClasses.dropDownTitleWrapper}>{value ? value : title}</span>}
      </span>
      <span className={utilityBarClasses.dropDownIcon}>
        <DropdownSvg />
      </span>
    </button>)
}

export function SearchBarClassy({props : { options , handleSearch }}) {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  //console.log(filteredOptions, 'mmmm');
  
  useEffect(() => {
    console.log(term, 'mmmm');
  }, [term]);

  const handleChange = (event) => {
    let value = event.target.value?.toLowerCase();
    setTerm(value);

    // Filter options based on input
    const filtered = options.filter(option =>
      option.val.toLowerCase().includes(value)
    );
    setFilteredOptions(filtered);
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // handleSearch(term);
    }}>
      <input
        className={utilityBarClasses.dropDownSearchInput}
        placeholder='type here to search'
        id='search'
        name='search'
        onChange={handleChange}
        defaultValue={term}
      />
    </form>
  );
}




