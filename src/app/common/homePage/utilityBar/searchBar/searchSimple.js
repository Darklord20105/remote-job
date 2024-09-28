'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import { DropdownSvg, CheckedSvg } from '../../../svg';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export default function SearchDropDownWrapper({ data }) {
    // since this is a Form like component we need to capture search strring so we need these
    const { options } = data;
    const { handleSearch } = useSearchFilter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(searchTerm, 'mmmm');
    }, [searchTerm]);

    const handleChange = (event) => {
        let value = event.target.value?.toLowerCase();
        setSearchTerm(value);

        // Filter options based on input
        const filtered = options.filter(option =>
            option.val.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
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
        <DropdownContent
            props={{
                data, searchTerm, isOpen, options, filteredOptions,
                error, setError,
                toggleDropdown, closeDropdown, handleSearch, handleChange
            }}
        />
    )
};

function DropdownContent(
    { props: { data, searchTerm, isOpen, options, filteredOptions,
        error, setError,
        toggleDropdown, closeDropdown, handleSearch, handleChange
    } }
) {
    const { id, placeholder, Icon } = data;
    return (
        <>
            <button type="button"
                id={id}
                className={utilityBarClasses.dropDownButton}
                onClick={toggleDropdown}
                style={{ border: error ? "1px solid red" : "" }}

            >
                <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
                    <span className={utilityBarClasses.dropDownItemContentImage}>{Icon}</span>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let x = options.some(item => {
                            return searchTerm === item.val;
                        })
                        if (x) {
                            setError(null);
                            handleSearch(searchTerm);
                            closeDropdown();
                        } else {
                            setError("no Match")
                        }
                    }}>
                        <input
                            className={utilityBarClasses.dropDownSearchInput}
                            placeholder={placeholder}
                            id={id}
                            name={id}
                            onChange={handleChange}
                        />
                    </form>
                </span>
                <span className={utilityBarClasses.dropDownIcon}>
                    <DropdownSvg />
                </span>
            </button>
            {isOpen ? <ul className={utilityBarClasses.dropDownUL}>
                {filteredOptions.map(({ oid, val, oicon, searchTerm }) => {
                    return <SearchSuggestionOption key={oid} data={{ oid, val, oicon, handleSearch, closeDropdown }} />
                })}
            </ul> : null}
        </>
    )
}

function SearchSuggestionOption(
    { data: { oid, val, oicon, searchTerm, handleSearch, closeDropdown } }
) {
    return (
        <li className={utilityBarClasses.dropDownLI} id={oid}
            onClick={() => {
                closeDropdown();
                handleSearch(val)
            }
            } >
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
                {val === searchTerm ? <CheckedSvg /> : null}
            </span>
        </li>
    )
}
