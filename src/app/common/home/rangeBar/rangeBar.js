'use client'
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../constants/classes';
import DropdownWrapper, { DropdownContext } from '../dropdown/dropdown';

export default function RangeBar({data}) {
  return (
    <DropdownWrapper>
      <RangeSlider data={...data}/>
    </DropdownWrapper>
  )
}

function RangeSlider({data: {id, title, icon, min, max, filter}}) {
  const { value, isOpen, setValue, handleComplexChange, toggleDropdown, closeDropdown, objectProps, setObjectProps } = useContext(DropdownContext);

  // this hook is used to send props up to parent dropdown wrapper
  useEffect(() => {
    setObjectProps({id, title, icon, action});
  }, [])
  // action is the UI exit to fetch data
  const action = (val) => {
    console.log('action ',val)
    filter(val)
  }
  
  if (!isOpen) { return null };
  return (
    <ul className={utilityBarClasses.dropDownUL}>
      <li className={utilityBarClasses.dropDownLI} id={title} onClick={() => handleChange()}>
	  <div className={utilityBarClasses.dropDownItemContentWrapper}> 
	      <div className="py-1 px-3">
	  	<label htmlFor={id} className={utilityBarClasses.dropDownLabel}>
	  	  Salary Range {value} k
	  	</label>
	  	
	  	<input type="range" 
		  id={id}
	  	  className={utilityBarClasses.dropDownRangeBar} 
	          value={value} min={min} max={max} step="1" 
	  	  onChange={(e) => handleComplexChange(e, action)}
	  	/>
              </div>
	  </div>
	</li>
    </ul>
  )
}


/*
[&::-webkit-slider-runnable-track]:rounded-full 
[&::-webkit-slider-runnable-track]:bg-black/25 
[&::-webkit-slider-thumb]:appearance-none 
[&::-webkit-slider-thumb]:h-[50px] 
[&::-webkit-slider-thumb]:w-[50px] 
[&::-webkit-slider-thumb]:rounded-full 
[&::-webkit-slider-thumb]:bg-purple-500
*/
