import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import globe from '../../../assets/img/green-globe.svg'
import money from '../../../assets/img/money-bag.svg'
import temp from '../../../assets/img/temp.svg';
import logo from '../../../assets/img/logo.jpeg';
import { calculateDayDifference } from '../../../utils/helper';

function Info({ data: { text, img } }) {
  return (
    <div className="border-grey rounded-[0.5em] text-black bg-white text-[12px] px-[0.5em] py-[0.05em] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border">
      {img && <div className='w-3 h-3 flex' >
        <Image
          priority
          src={img}
          width='100%'
          height='100%'
          alt={text + ' info image'}
        />
      </div>}
      <p>{text}</p>
    </div>
  )
}

function Tag({ data: { text, handleSearch } }) {
  return (
    <div className="border-grey rounded-[0.5em] text-black bg-white text-[12px] px-[0.5em] py-[0.05em] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border" onClick={() => handleSearch(text)}>
      <p>{text}</p>
    </div>
  )
}

function priorityHandler(priority) {
  switch (priority) {
    case 'high':
      return { bg: "bg-special", text: 'text-inherit' };
      break;
    case 'medium':
      return { bg: "bg-amber-400", text: 'text-black' };
      break;
    default:
      return { bg: "bg-yellow", text: 'text-black' };
  }
}

function RenderTextLogo({ props: { company } }) {
  const text = company.split(" ").map(letter => letter[0]).join('').slice(0, 2).toUpperCase();
  return (<div className='rounded-full bg-white w-full h-full text-black flex justify-center items-center text-3xl font-bold border'>{text}</div>)
}

function LogoImage() {
  return (
    <Image priority src={logo} width='100%' alt='logo' className='rounded-full border' />
  )
}

function Details({ props: { company, role, text } }) {
  return (
    <div className={"flex flex-col justify-start " + text}>
      <p className="font-bold text-[16px]">{role}</p>
      <p>{company}</p>
    </div>
  )
}

export default function FeedItem({
  data: { id, company, role, createdAt, logo, location,
    salaryRangeMin, salaryRangeMax, verified, hot, jobType, tagList, priority }
}) {
  // tag functionality
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    // Basically this updates url params to  be recieved on home page and search
    const params = new URLSearchParams(searchParams);
    function preventDuplicateFilter(arr) {
      let a = new Set(arr)
      return [...a]
    }
    // get previous term
    let previousTerm = params.getAll('filter') || [];
    
    // if we have a previous item we need to merge our new term
    // first we need to delete our old filter and make new merged one
    // it was quite hard to do this 
    // PLEASE DON'T CHANGE UNLESS YOU KNOW WHAT TO DO !!!
    if (previousTerm.length > 0) {
      // if we have already a param in url delete it
      params.delete('filter')
      console.log(previousTerm, "before push new param")
 
      let a = previousTerm.join("").split(" ");
      console.log("try to fix before", a)
      a.push(term);
      let b = preventDuplicateFilter(a)
      console.log("try fixing stage 2", b)

      let newTerm = b.join(' ');
      params.append('filter', newTerm)
    } else {
      params.append('filter', term);
    }

    // console.log(params);
    replace(`${pathname}?${params.toString()}`);
  }

  // customizations
  const tags = tagList.slice(0, 3)
  let date = calculateDayDifference(createdAt.toDate());
  let styling = priorityHandler(priority);
  const { bg, text } = styling;
  const salary = `$${salaryRangeMin}k - $${salaryRangeMax}k`

  return (
    <div className={'flex m-2 p-2 text-gray-300 gap-1 rounded-lg border-solid border-slate-500 border relative ' + bg}>
      {/* section 1 logo alone */}
      <div className="logo-image flex justify-center items-center sm-hidden" style={{ width: '5rem', height: '5rem' }}>
        {logo ? <LogoImage /> : <RenderTextLogo props={{ company }} />}
      </div>
      {/* section 2 details with /location/ /salary/ /full or contract/ */}
      <div className='details ml-4' style={{ width: '30rem' }}>
        <Details props={{ company, role, text }} />
        <div className='detail-list flex gap-2 my-2'>
          <Info data={{ text: location, img: globe }} />
          <Info data={{ text: salary, img: money }} />
          {jobType && <Info data={{ text: 'contractor', img: temp }} />}
        </div>
      </div>
      {/* section 3 tags */}

      <div className='tag-list flex items-center justify-start gap-4 ksm-hidden ' style={{ flex: 1 }}>
        {tags.map(i => {
          return <Tag key={i} data={{ text: i, handleSearch }} />
        })}
      </div>
      <div className={'flex justify-center items-center sm-hidden font-semibold ' + text} style={{ flex: 0.25 }}>
        <p>{date} Days <Link href={`/job/${id}/job-update`}>update</Link></p>
	<p><Link href={`job/${id}/job-details`}> details</Link></p>
      </div>
    </div>
  )
}
