export const utilityClass = 'appearance-none h-full rounded-full border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8';

export const utilityBarClasses = {
  // classes for general dropdown MainDropdown component
  dropDownButton: 'appearance-none h-full rounded-full border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8',
  dropDownButtonChildrenWrapper: "flex items-center",
  dropDownSearchInput: 'w-full focus:outline-none focus:bg-white focus:border-gray-500 ml-3',
  dropDownTitleWrapper: "ml-3 block truncate",
  dropDownIcon: "pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2",
  dropDownUL: "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
  dropDownLI: "relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900",
  dropDownItemContentWrapper:"flex items-center",
  
  // classes for option dropdown component
  dropDownItemContentImageWrapper: '',
  dropDownItemContentImage: "h-5 w-5 flex-shrink-0 rounded-full",
  dropDownItemContentText: "ml-3 block truncate font-normal",
  dropDownItemContentSvgChecked: "absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600",
  
  // classes for range dropdown component
  dropDownLabel: "block text-gray-700 font-bold mb-2",
  dropDownRangeBar: "w-full bg-red accent-indigo-600 cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[8px] [&::-webkit-slider-thumb]:w-[8px] [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:bg-purple-500",
  
}
