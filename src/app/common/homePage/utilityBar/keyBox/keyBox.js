import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import close from '../../../../assets/img/close.svg';

export default function KeyBox({query : { queryList, clearSearch}}) {
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton}
      onClick={clearSearch}
    >
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
	<Image
          src={close}
          priority
          alt={'close icon'}
          className={utilityBarClasses.dropDownItemContentImage}
        />
        <span className={utilityBarClasses.dropDownTitleWrapper}>
	  {queryList[1]}</span>
      </span>
      <span className={utilityBarClasses.dropDownIcon}>
        
      </span>
    </button>)
}
