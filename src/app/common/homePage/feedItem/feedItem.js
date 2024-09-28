import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'
import { useSearchFilter } from '../../hooks/useSearchFilter';
import globe from '../../../assets/img/green-globe.svg'
import money from '../../../assets/img/money-bag.svg'
import temp from '../../../assets/img/temp.svg';
// import logo from '../../../assets/img/logo.jpeg';
import { formatTimestampToDate, timeAgo } from '../../../utils/helper';

function Info({ data: { text, img } }) {
  return (
    <div className="border-grey rounded-[0.5em] text-black bg-white text-[10px] px-[0.5em] py-[0.05em] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border">
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
    <div className="h-6 border-grey rounded-[0.5em] text-black bg-white text-[12px] font-bold px-[0.5em] py-[0.05em] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-500 border-2" onClick={() => handleSearch(text)}>
      <h3>{text}</h3>
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

function RenderTextLogo({ company }) {
  const text = company.split(" ").map(letter => letter[0]).join('').slice(0, 2).toUpperCase();
  return (<div className='rounded-full bg-white w-16 h-16 text-black flex justify-center items-center text-3xl font-bold border'>{text}</div>)
}

function LogoImage({logo}) {
  return (
    <Image priority width={64} height={64} src={logo} alt='logo' style={{maxWidth:"none"}} className='rounded-full border h-16' placeholder='empty'/>
  )
}

/// was 20, 16, 24 
function Details({ props: { company, position, verified } }) {
  return (
    <div className={"flex flex-col justify-start text-black"}>
      <p className="font-bold text-[16px] overflow-hidden">{position}
	  {verified && <span className='bg-lime-300 text-white text-[12.8px] px-2 py-1 ml-3 rounded-lg'>VERIFIED</span>}
      </p>
      <p className="font-light text-[19.2px]">{company}</p>
    </div>
  )
}

export default function FeedItem({
  data: { id, company, position, createdAt, logo, location,
    salaryRangeMin, salaryRangeMax, jobType, tagList, bgColorName, 
    bgColorToggle, verified, hot, priority, expand = false }
}) {

  const { handleSearch } = useSearchFilter();

  // customizations
  const tags = expand ? tagList : tagList.slice(0, 3)
  const formattedDate = formatTimestampToDate(createdAt);
  const timeAgoPeriod = timeAgo(formattedDate);
  const date = timeAgoPeriod.substring(0, timeAgoPeriod.length - 4);

  let styling = priorityHandler(priority);
  // const { bg, text } = styling;
  const salary = `$${salaryRangeMin/1000}k - $${salaryRangeMax/1000}k`

  return (
    <div 
      className='flex m-1 p-2 text-gray-300 gap-1 rounded-lg border-solid border-slate-500 border relative'
      style={
        expand ?                                                                                                    
	  { borderBottom:'none',
            borderRadius: '8px 8px 0px 0px',
            backgroundColor: bgColorName
          } :  { backgroundColor: bgColorName }
      }
    >
      {/* section 1 logo alone */}
      <div className="logo-image flex justify-center items-center sm-hidden" style={{width:'4rem'}}>
        {logo ? <LogoImage logo={logo}/> : <RenderTextLogo company={company} />}
      </div>
      {/* section 2 details with /location/ /salary/ /full or contract/ */}
      <div className='details mx-4 min-w-80 flex flex-col justify-center'>
        <Link href={!expand ? `job-details/${id}/` : '#'}>
	  <Details props={{ company, position, verified }} />
	</Link>
        <div className='detail-list flex gap-1 my-1'>
          <Info data={{ text: location, img: globe }} />
          <Info data={{ text: salary, img: money }} />
          <Info data={{ text: jobType, img: temp }} />
        </div>
      </div>
      {/* section 3 tags */}
      <div 
	className='tag-list w-full flex-wrap flex items-center content-center  gap-2 sm-hidden ' 
	style={ expand ? {flexWrap:'wrap', padding: '0 5rem'}: {} }	
      >
        {tags.map(i => {
          return <Tag key={i} data={{ text: i, handleSearch }} />
        })}
      </div>
      <div className={'flex w-40 ml-auto justify-center text-black items-center sm-hidden font-semibold'}>
        <p>{date}</p>
      </div>
    </div>
  )
}
