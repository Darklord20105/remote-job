'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../constants/classes';
import { DropdownSvg, CheckedSvg, CloseMiniSvg, CloseSvg } from '../svg';

export function SpecialInputDropDownWrapper({ data }) {
    // since this is a Form like component we need to capture search strring so we need these
    const { id, label, helperText, options, allowDefaultValue,
        handleSpecialInputDropDown, validationError } = data;
    const [term, setTerm] = useState('');
    const [termList, setTermList] = useState([])
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [error, setError] = useState(null);

    useEffect(() => {
        allowDefaultValue && setTermList(prevState => ([...prevState, { id: options[0].val, oicon: options[0].oicon }]))
    }, []);

    useEffect(() => {
        // alert(JSON.stringify(termList));
        handleSpecialInputDropDown(id, termList);
    }, [termList])

    const handleChange = (event) => {
        let value = event.target.value?.toLowerCase();
        setTerm(value);

        // Filter options based on input
        const filtered = options.filter(option =>
            option.val.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
    }

    const preventDuplicateObjectFilter = (arr, key) => {
        return [
            ...new Map(arr.map(x => [key(x), x])).values()
        ]
    };

    // this function is used to to send query params into url
    const handleSearch = (term, oicon) => {
        setTermList(prevState => {
            return preventDuplicateObjectFilter([...prevState, { id: term, oicon: oicon }], it => it.id);
        });
        setTerm('');
        closeDropdown()
    }

    const clearSelection = (val) => {
        let arr = termList.filter(item => item['id'] !== val);
        // alert(JSON.stringify(arr));
        setTermList(arr);
        handleSpecialInputDropDown(id, arr);
    }

    /* MENU Functions show hide */
    // open menu status BOOLEAN
    const [isOpen, setIsOpen] = useState(false);

    // a function used to toggle the menu between show and hide
    const toggleDropdown = () => setIsOpen(!isOpen);

    // a function used to close the menu
    const closeDropdown = () => setIsOpen(false);

    // useEffect(() => console.log(value, 'effect root level'), [value])
    return (
        <div className="block w-full mb-4">
            <div className="relative">
                {label && <label htmlFor={data.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{label}</label>}
                <DropdownContent
                    props={{
                        data, term, termList, isOpen, options, filteredOptions,
                        error, setError,
                        toggleDropdown, handleSearch, handleChange, clearSelection
                    }}
                />
                {helperText && <span className="text-xs text-gray-400 font-normal mt-2 block">{helperText}</span>}
	    {validationError && <span className="text-xs text-red-400 font-normal mt-2 block">
                {validationError.error}</span>}
            </div>
        </div>
    )
};

function SmallTag({ data: { text, oicon, clearSelection } }) {
    return (
        <span onClick={() => clearSelection(text)} className="border-grey rounded-[0.5em] text-black bg-white text-[12px] px-2 py-[0.05em] rounded-full cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border">{oicon}{text}
            <span className='w-4 h-4'> <CloseSvg /> </span>
        </span>
    )
}

function DropdownContent(
    { props: { data, term, termList, isOpen, options, filteredOptions,
        error, setError,
        toggleDropdown, handleSearch, handleChange, clearSelection
    } }
) {
    // console.log(data)
    const { id, placeholder } = data;
    return (
        <>
	    <div className='flex flex-wrap mb-3 gap-3'>
	    {termList.length > 0 && termList.map(i =>                                             <SmallTag key={i.id} data={{ text: i.id, oicon: i.oicon, clearSelection }} /> )}</div>
            <button type="button"
                id={id}
                // className={utilityBarClasses.dropDownButton}
                className={"appearance-none block flex items-center justify-between w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"}
                onClick={toggleDropdown}
                style={{ border: error ? "1px solid red" : "" }}

            >
                <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

                        <input
                            className={utilityBarClasses.dropDownSearchInput}
                            placeholder={placeholder}
                            id={id}
                            name={id}
                            onChange={handleChange}
                        />
                        {/*termList.length > 0 && termList.map(i =>
                            <SmallTag key={i.id} data={{ text: i.id, oicon: i.oicon, clearSelection }} /> ) */}
                    </div>
                </span>
                <span className={"pointer-events-none ml-3 flex items-center pr-2"} >
                    <DropdownSvg />
                </span>
            </button>
            {isOpen ?
                <ul className={utilityBarClasses.dropDownUL}>
                    {filteredOptions.map(({ oid, val, oicon, searchTerm }) => {
                        return <SuggestionOption key={oid} data={{ oid, val, oicon, handleSearch }} />
                    })}
                </ul>
                : null}
        </>
    )
}

function SuggestionOption(
    { data: { oid, val, oicon, term, handleSearch } }
) {
    return (
        <li className={utilityBarClasses.dropDownLI} id={oid}
            onClick={() => handleSearch(val, oicon)} >
            <div className={utilityBarClasses.dropDownItemContentWrapper}>
                {oicon}
                <span className={utilityBarClasses.dropDownItemContentText}>{oid}</span>
            </div>
            <span className={utilityBarClasses.dropDownItemContentSvgChecked}>
                {val === term ? <CheckedSvg /> : null}
            </span>
        </li>
    )
}
