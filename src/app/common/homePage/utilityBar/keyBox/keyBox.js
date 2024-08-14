import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import close from '../../../../assets/img/close.svg';

export  function KeyBox({ query: { queryKey, clearOneCriteria } }) {
  console.log('key box', queryKey)
  return (
    <button type="button"
      className={utilityBarClasses.dropDownButton}
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

export  function KeyBoxClearAll({ query: { queryKey, resultCount, clearSearch } }) {
  console.log('clear', queryKey)
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
          {queryKey} : {resultCount} results
        </span>
      </span>
      {/* <span className={utilityBarClasses.dropDownIcon}>

      </span> */}
    </button>)
};
