'use client'
import {
    useState,
    createContext,
} from 'react';
import { 
    useSearchParams, 
    usePathname, 
    useRouter 
} from 'next/navigation';
import UtilityBar from '../common/homePage/utilityBar/utilityBar';

export const ContextProvider = createContext('light');

export function ProviderWrapper({ children }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [resultCount, setResultCount] = useState(0);

    const params = new URLSearchParams(searchParams);
    // filter from url
    const filterkey = searchParams.get('filter');
    // console.log(filterkey, 'query key home page')
    const queryCriteriaList = filterkey && filterkey.split(' ') || [];
    // console.log(queryCriteriaList, 'query list, value in home page from url')

    function preventDuplicateFilter(arr) {
        let a = new Set(arr);
        return [...a]
    }
    let queryList = preventDuplicateFilter(queryCriteriaList);

    // sort from url
    const filterSort = searchParams?.get('sort-by') || null;

    let sortKey, sortDirection;
    if (filterSort) {
        sortKey = filterSort && filterSort.split('&')[0];
        sortDirection = filterSort.split('&')[1];
    } else {
        sortKey = "createdAt";
        sortDirection = "desc";
    }

    // alert(JSON.stringify(sortKey))
    function clearSearch() {
        console.log('clear all filters');
        params.delete('filter');
        replace(`${pathname}?${params.toString()}`);
    }

    function clearOneCriteria(id) {
        console.log("clear criteria " + id);
        let newFilter = params.getAll("filter").join(" ").split(" ").filter(item => item !== id);
        params.delete('filter');
        let m = newFilter.join(" ");
        console.log(m, "new filter");
        if (newFilter.length > 0) {
            params.append('filter', m);
        }

        replace(`${pathname}?${params.toString()}`);
    };
    function collectResultCount(count) {
        setResultCount(count);
    }
    return (
        <div className="mx-auto w-full max-w-6xl px-6">
            <ContextProvider
                value={{ queryList, sortKey, sortDirection, resultCount, collectResultCount, clearSearch, clearOneCriteria }}>
                <UtilityBar query={{
                    queryList: queryList,
                    resultCount: resultCount,
                    clearSearch, clearOneCriteria,
		    pathname: pathname,
                }}
                />
                {children}
            </ContextProvider>
        </div>

    )
}  
