'use client'
import {
  useState,
  useEffect,
  useCallback,
  createContext 
} from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../constants/classes';

function DropdownSvg() {
  return(
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd"  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
    </svg>
  )
};

export const DropdownContext = createContext('light');

// this function serves as the default interface for the dropdown menu - what gets rendered on first page load - 

function MainDropdown(
  { data: { value, toggleDropdown, handleComplexChange,
    handleSubmit, objectProps :{id, title, formMode, action, icon} } }
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
	   <form onSubmit={e => handleSubmit(e, action) }>
	     <input 
		type='text' 
		className={utilityBarClasses.dropDownSearchInput} 
	        onChange={e => handleComplexChange(e)}
		id={id}
		placeholder='Search'
		value={value || ''}
	     />
	   </form>
	 : <span className={utilityBarClasses.dropDownTitleWrapper}>{value ? value: title}</span>}
      </span>                                                                     
      <span className={utilityBarClasses.dropDownIcon}>
	  <DropdownSvg />
       </span>                                                                   
    </button>)
}


// The main reason for this component is to make a dropdown menu wrapper for all 
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

  /* HANDLE VALUE CHANGES Functions */
  // a function used in dropdown to capture the value when the user selects an option , also serves to close down the menu OBJECT
  const handleChange = (val, action) => {
	console.log('on change run', val)
        setValue(val);
	closeDropdown();
	action(val)
  };
  
  // a function to handle slider change
  
  const handleComplexChange = useCallback((e, action) => {
    console.log(e.target.value);
    setValue(e.target.value.toString());
    closeDropdown();
    action && action(e.target.value.toString())
    
  }, [setValue]);

  // this function to trigger action on submit
  
  const handleSubmit = (e, action) => {
    e && e.preventDefault();
    console.log(value, 'submit search input  level');
    closeDropdown()
    action(value)
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
       value={{value, isOpen, setValue, 
	 handleChange, handleComplexChange, handleSubmit, 
	 closeDropdown, objectProps, setObjectProps 
       }}>
      <MainDropdown 
	data={{value, toggleDropdown, objectProps,handleSubmit, 
	 handleComplexChange}}
      />
      {children}
    </DropdownContext>
  )
};
