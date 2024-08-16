'use client'
import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import DropdownWrapper, { DropdownContext } from '../dropdown/dropdown';
import { CheckedSvg } from '@/app/common/svg';

// CUSTOM DROPDOWN for option menu dropdown


export default function OptionMenu({ data }) {
  return (
    <DropdownWrapper>
      <OptionList data={...data} />
    </DropdownWrapper>
  )
}


function OptionList({ data: { id, title, Icon, options } }) {
  const { isOpen, handleOption, setObjectProps } = useContext(DropdownContext);

  // this hook is used to send props up to parent dropdown wrapper
  useEffect(() => {
    setObjectProps({ id, title, Icon })
  }, [])

  if (!isOpen) { return null }
  return (
    <ul className={utilityBarClasses.dropDownUL}>
      {options.map(({ oid, val, oicon }) => {
        return <OptionItem key={oid} data={{ oid, val, oicon, id, handleOption }} />
      })}
    </ul>
  )
};

function OptionItem({ data: { oid, val, oicon, handleOption } }) {
  return (
    <li className={utilityBarClasses.dropDownLI} id={oid}
      onClick={() => handleOption(val)}  >
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
