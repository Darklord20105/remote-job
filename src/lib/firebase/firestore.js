import { db } from "./clientApp";
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

export async function fetchFilteredJobList(queryList) {
  const jobRef = collection(db, 'jobList');
  console.log(queryList, 'query key in firestore get doc function')
  let filter;
  let [ property, value ] = queryList;
  console.log(property, value)

  let operator;
  if (property === 'tagList') { 
	operator = "array-contains"
  } else if (property === 'salaryRange') {
	property = 'salaryRange.min'
	operator = '>='
  } else { operator = '=='  }
  
  if (queryList.length > 0) {
    filter = query(jobRef , where(property, operator , value) )
  } else { filter = jobRef; }
  
  try {
    let snapshot = await getDocs(filter);
    console.log(snapshot, 'data from firestore snapshot');

    return snapshot.docs.map(doc => {
      return {id: doc.id,  ...doc.data()}
    });
  }
  catch(error) {
    console.log(error)
  } 

}

/*

 https://nextjs.org/docs/app/api-reference/functions/use-search-params
get two query values
export default function ExampleClientComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <>
      <p>Sort By</p>

      using useRouter 
      <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(pathname + '?' + createQueryString('sort', 'asc'))
        }}
      >
        ASC
      </button>

      or using link
      <Link
        href={
          // <pathname>?sort=desc
          pathname + '?' + createQueryString('sort', 'desc')
        }
      >
        DESC
      </Link>
    </>
  )
}
*/
