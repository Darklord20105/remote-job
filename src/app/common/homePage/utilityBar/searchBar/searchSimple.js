'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { utilityBarClasses } from '../../../../constants/classes';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { DropdownSvg, CheckedSvg } from '../../../svg';

export default function SearchDropDownWrapper({ data }) {
    // since this is a Form like component we need to capture search strring so we need these
    const { options } = data;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [ error, setError] = useState(null);
    
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
    // to send data tp url as params we need these
    // new handle search with url params
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const preventDuplicateFilter = (arr)  => {
        let a = new Set(arr);
        return [...a]
    };

    // this function is used to to send query params into url
    const handleSearch = (term) => {
        let previousTerm = params.getAll('filter') || [];

        // if we have a previous item we need to merge our new term
        // first we need to delete our old filter and make new merged one
        // it was quite hard to do this                        
        // // PLEASE DON'T CHANGE UNLESS YOU KNOW WHAT TO DO !!!
        if (previousTerm.length > 0) {
            // if we have already a param in url delete it
            params.delete('filter');
            console.log(previousTerm, "before push new param");

            let a = previousTerm.join("").split(" ");
            console.log("try to fix before", a);
            a.push(term);
            let b = preventDuplicateFilter(a);
            console.log("try fixing stage 2", b);

            let newTerm = b.join(' ');
            params.append('filter', newTerm);
        } else {
            params.append('filter', term);
        }

        replace(`${pathname}?${params.toString()}`);
        closeDropdown()
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
                toggleDropdown, handleSearch, handleChange
            }}
        />
    )
};

function DropdownContent(
    { props: { data, searchTerm, isOpen, options, filteredOptions,
        error, setError,
        toggleDropdown, handleSearch, handleChange
    } }
) {
    console.log(data)
    const { id, placeholder, Icon } = data;
    return (
        <>
            <button type="button"
                id={id}
                className={utilityBarClasses.dropDownButton}
                onClick={toggleDropdown}
                style={{border: error ? "1px solid red" : ""}}
                
            >
                <span className={utilityBarClasses.dropDownButtonChildrenWrapper}>
                    <span className={utilityBarClasses.dropDownItemContentImage}>{Icon}</span>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let x = options.some(item => {
                            return searchTerm === item.val
                        })
                        if (x) {
                            setError(null)
                            handleSearch(searchTerm);
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
                    return <SearchSuggestionOption key={oid} data={{ oid, val, oicon, handleSearch }} />
                })}
            </ul> : null}
        </>
    )
}

function SearchSuggestionOption(
    { data: { oid, val, oicon, searchTerm, handleSearch } }
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
                {val === searchTerm ? <CheckedSvg /> : null}
            </span>
        </li>
    )
}