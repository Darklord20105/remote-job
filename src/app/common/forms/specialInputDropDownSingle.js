'use client'
import { useState, useEffect } from 'react';
import { utilityBarClasses } from '../../constants/classes';
import { DropdownSvg, CheckedSvg, CloseMiniSvg, CloseSvg } from '../svg';

export function SpecialInputDropDownSingleWrapper({ data }) {
    // since this is a Form like component we need to capture search strring so we need these
    const { id, label, helperText, options, allowDefaultValue,
        handleSpecialInputDropDownSingleChoice } = data;
    const [term, setTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [error, setError] = useState(null);

    useEffect(() => {
        allowDefaultValue && setTermList({ id: options[0].val, oicon: options[0].oicon })
    }, []);

    useEffect(() => {
        // alert(JSON.stringify(termList));
        handleSpecialInputDropDownSingleChoice(id, term);
    }, [term])

    const handleChange = (event) => {
        let value = event.target.value?.toLowerCase();
        setTerm(value);

        // Filter options based on input
        const filtered = options.filter(option =>
            option.val.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
    }

    // this function is used to to send query params into url
    const handleSearch = (term) => {
        setTerm(term);
        closeDropdown()
    }

    /* MENU Functions show hide */
    // open menu status BOOLEAN
    const [isOpen, setIsOpen] = useState(false);

    // a function used to toggle the menu between show and hide
    const toggleDropdown = () => setIsOpen(!isOpen);

    // a function used to close the menu
    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="block w-full mb-4">
            <div className="relative">
                {label && <label htmlFor={data.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{label}</label>}
                <DropdownContent
                    props={{
                        data, term, isOpen, options, filteredOptions,
                        error, setError,
                        toggleDropdown, handleSearch, handleChange,
                    }}
                />
                {helperText && <span className="text-xs text-gray-400 font-normal mt-2 block">{helperText}</span>}
                {/* {errors[item.id] && <span className="text-xs text-red-400 font-normal mt-2 block">
                {errors[item.id].error}</span>} */}
            </div>
        </div>
    )
};

function DropdownContent(
    { props: { data, term, isOpen, options, filteredOptions,
        error, setError,
        toggleDropdown, handleSearch, handleChange,
    } }
) {
    const { id, placeholder } = data;
    return (
        <>
            <button type="button"
                id={id}
                // className={utilityBarClasses.dropDownButton}
                className={"appearance-none block flex items-center justify-between w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"}
                onClick={toggleDropdown}
                style={{ border: error ? "1px solid red" : "" }}

            >
                <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
                    <div style={{ display: 'flex' }}>
                        <input
                            className={utilityBarClasses.dropDownSearchInput}
                            style={{ order: 4 }}
                            placeholder={placeholder}
                            id={id}
                            name={id}
                            onChange={handleChange}
                            value={term}
                        />
                    </div>
                </span>
                <span className={"pointer-events-none ml-3 flex items-center pr-2"} >
                    <DropdownSvg />
                </span>
            </button>
            {isOpen ?
                <ul className={utilityBarClasses.dropDownUL}>
                    {filteredOptions.map(({ oid, val, oicon }) => {
                        return <SuggestionOption key={oid} data={{ oid, val, handleSearch }} />
                    })}
                </ul>
                : null}
        </>
    )
}

function SuggestionOption(
    { data: { oid, val, term, handleSearch } }
) {
    return (
        <li className={utilityBarClasses.dropDownLI} id={oid}
            onClick={() => handleSearch(oid)} >
            <div className={utilityBarClasses.dropDownItemContentWrapper}>
                <span className={utilityBarClasses.dropDownItemContentText}>{oid}</span>
            </div>
            <span className={utilityBarClasses.dropDownItemContentSvgChecked}>
                {val === term ? <CheckedSvg /> : null}
            </span>
        </li>
    )
}
