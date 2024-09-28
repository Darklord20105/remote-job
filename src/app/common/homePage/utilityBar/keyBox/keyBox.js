import Image from 'next/image';
import Link from 'next/link'
import { utilityBarClasses } from '../../../../constants/classes';
import close from '../../../../assets/img/close.svg';
import arrowback from '../../../../assets/img/arrowback.svg';


export function KeyBox({ query: { queryKey, clearOneCriteria } }) {
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton}
      style={{width:'fit-content', marginRight:'0.5rem'}}
      onClick={() => clearOneCriteria(queryKey)}
    >
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
        <Image
          src={close}
          priority
          alt={'close icon'}
          className={utilityBarClasses.dropDownItemContentImage}
        />
        <span className={utilityBarClasses.dropDownTitleWrapper}>
          {queryKey}
        </span>
      </span>
      {/* <span className={utilityBarClasses.dropDownIcon}>

      </span> */}
    </button>)
};

export function KeyBoxClearAll({ query: { queryKey, resultCount, clearSearch } }) {
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton}
      style={{width:'fit-content', marginRight:'0.5rem'}}
      onClick={clearSearch}
    >
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
        <Image
          src={close}
          priority
          alt={'close all icon'}
          className={utilityBarClasses.dropDownItemContentImage}
        />
        <span className={utilityBarClasses.dropDownTitleWrapper}>
          {queryKey} : {resultCount} results
        </span>
      </span>
      {/* <span className={utilityBarClasses.dropDownIcon}>

      </span> */}
    </button>)
};

export function KeyBoxGoBack({}) {
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton}
      style={{width:'fit-content', marginRight:'0.5rem'}}
      
    >
      <Link href='/'>
      <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
        <Image
          src={arrowback}
          priority
          alt={'Arrow Back Icon'}
          className={utilityBarClasses.dropDownItemContentImage}
        />
        <span className={utilityBarClasses.dropDownTitleWrapper}>
          Go Back
        </span>
      </span>
      </Link>
    </button>)
};
