'use client'
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import DropdownWrapper, { DropdownContext } from '../dropdown/dropdown';
import { CheckedSvg } from '../../../svg';

// CUSTOM DROPDOWN for search menu with dropdown

export default function SearchBar({ data }) {
  return (
    <DropdownWrapper>
      <SearchInput data={...data} />
    </DropdownWrapper>
  );
}

function SearchInput({ data: { id, title, options, Icon, formMode } }) {
  const { isOpen, handleSearch, setObjectProps } = useContext(DropdownContext);

  // this hook is used to send props up to parent dropdown wrapper

  useEffect(() => {
    setObjectProps({ id, title, formMode, Icon });
  }, []);

  if (!isOpen) { return null }
  return (
    <ul className={utilityBarClasses.dropDownUL}>
      {options.map(({ oid, val, oicon }) => {
        return <SearchSuggestionOption key={oid} data={{ oid, val, oicon, handleSearch }} />
      })}
    </ul>
  )
}

function SearchSuggestionOption(
  { data: { oid, val, oicon, handleSearch } }
) {
  return (
    <li className={utilityBarClasses.dropDownLI} id={oid}
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

