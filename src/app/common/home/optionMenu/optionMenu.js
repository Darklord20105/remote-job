'use client'
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../constants/classes';
import DropdownWrapper, { DropdownContext } from '../dropdown/dropdown';


function CheckedSvg() {
  return (                                                                      
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
	<path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75,75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  )
}

/*
    CUSTOM DROPDOWN for option menu dropdown
*/

export default function OptionMenu( { data }  ) {
  // console.log(data)
  return(
    <DropdownWrapper>
	<OptionList data={...data}/>
    </DropdownWrapper>
  )
}


function OptionList( {data : {id, title, icon, options, filter}} ) {
  const { value, isOpen, setValue, handleChange, toggleDropdown, closeDropdown, objectProps, setObjectProps } = useContext(DropdownContext);
   
  // this hook is used to send props up to parent dropdown wrapper
  useEffect(() => {
    setObjectProps({id, title, action, icon})
  }, [])
  // action is the UI exit to fetch data
  const action = (val) => {
    console.log('trigger action in option menu '+ title , val );
    filter(val, id)
  }
  if (!isOpen) { return null }
  return (
    <ul className={utilityBarClasses.dropDownUL}>
	{options.map(({oid, val, oicon}) => {
	  return <OptionItem key={oid} data={{ oid, val, oicon, handleChange, action }} />
	})}
    </ul>
  )
};

function OptionItem({data : { oid, val, oicon, handleChange, action }}) {
  return (
    <li className={utilityBarClasses.dropDownLI} id={oid} 
	  onClick={() => handleChange(val, action)}  >
      <div className={utilityBarClasses.dropDownItemContentWrapper}>
	  <Image  
	    {...oicon}
	    priority
	    alt={oid}
	    className={utilityBarClasses.dropDownItemContentImage}
	  />
	  <span className={utilityBarClasses.dropDownItemContentText}>{oid}</span>
      </div>
      <span className={utilityBarClasses.dropDownItemContentSvgChecked}>
	  <CheckedSvg />
      </span>
     </li>
  )
}
