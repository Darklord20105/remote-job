'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { utilityBarClasses } from '../../../../constants/classes';
import DropdownWrapper, { DropdownContext } from '../dropdown/dropdown';
import { useContext, useEffect } from 'react';
import Image from 'next/image';

function CheckedSvg() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
	<path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75,75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  )
}

export default function SearchBar({data}) {
  return (
    <DropdownWrapper>
      <SearchInput data={...data}/>
    </DropdownWrapper>
  );
}

function SearchInput({data: {id, title, options, icon, formMode} }) {
  const { isOpen, handleSearch, setObjectProps } = useContext(DropdownContext);

  // this hook is used to send props up to parent dropdown wrapper
  useEffect(() => {
    setObjectProps({id, title, formMode,  icon});
  }, []);
  
  if (!isOpen) { return null }
  return (
    <ul className={utilityBarClasses.dropDownUL}>
	{options.map(({oid, val, oicon}) => {
	  return <SearchSuggestionOption key={oid} data={{ oid, val, oicon, handleSearch }} />
        })}
    </ul>
  )
}

function SearchSuggestionOption(
  {data : { oid, val, oicon, handleSearch } }
) {
  return (
    <li className={utilityBarClasses.dropDownLI}  id={oid} 
	  onClick={() => handleSearch(val)} >
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

