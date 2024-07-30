import Image from 'next/image';
import globe from '../../../assets/img/green-globe.svg'
import money from '../../../assets/img/money-bag.svg'
import temp from '../../../assets/img/temp.svg';
import logo from '../../../assets/img/logo.jpeg';
import { calculateDayDifference } from '../../../utils/helper';

function Info({data : {text, img} }) {
  return (
    <div className="border-grey rounded-[0.5em] text-black bg-white text-[12px] px-[0.5em] py-[0.05em] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border">
      {img && <div className='w-3 h-3 flex' >
	<Image
	  priority
	  src={img}
	  width='100%'
	  height='100%'
	  alt="Follow us on Twitter"
	/> 
       </div> }
       <p>{text}</p>
    </div>
  )
}

function priorityHandler(priority) {
  switch (priority) {
    case 'high':
      return {bg:"bg-special", text:'text-inherit'};
      break;
    case 'medium':
      return {bg:"bg-amber-400", text:'text-black'};
      break;
    default:
      return {bg:"bg-yellow", text:'text-black'};
  }
}

function RenderTextLogo({props: {company}}) {
  const text = company.split(" ").map(letter => letter[0]).join('').slice(0,2).toUpperCase();
  return (<div className='rounded-full bg-white w-full h-full text-black flex justify-center items-center text-3xl font-bold border'>{text}</div>)
}

function LogoImage() {
  return (
    <Image src={logo} width='100%' alt='logo' className='rounded-full border'/>
  )
}

function Details({props: { company, role, text }}) {
  return (
    <div className={"flex flex-col justify-start "+ text}>
      <p className="font-bold text-[16px]">{role}</p>
      <p>{company}</p>
    </div>
  )
}

export default function FeedItem({
  data: { company, role, createdAt, logo, location, 
	  salaryRange, verified, hot, jobType, tagList, priority }
}) {
  const tags = tagList.slice(0, 3)
  let date = calculateDayDifference(createdAt);
  let styling = priorityHandler(priority);
  const { bg, text } = styling;
  const salary = `$${salaryRange.min}k - $${salaryRange.max}k`

  return (
    <div className={'flex m-2 p-2 text-gray-300 gap-1 rounded-lg border-solid border-slate-500 border relative ' + bg}>                                                                             
	{/* section 1 logo alone */}
	<div className="logo-image flex justify-center items-center sm-hidden" style={{width:'5rem', height:'5rem'}}>
	  {logo ?  <LogoImage />: <RenderTextLogo props={{company}} /> }
	</div>
        {/* section 2 details with /location/ /salary/ /full or contract/ */}
	<div className='details ml-4' style={{width:'30rem'}}>
	  <Details props={{company, role, text}}/>
	  <div className='detail-list flex gap-2 my-2'>
	    <Info data={ {text:location, img: globe } } />
	    <Info data={ {text:salary, img: money} } />
	    { jobType && <Info data={ {text:'contractor', img :temp } } />}
	  </div>
	</div>
	{/* section 3 tags */}

	<div className='tag-list flex items-center justify-start gap-4 sm-hidden ' style={{ flex: 1 }}>
	  {tags.map(i => {
	    return <Info data={ {text: i}}/>
	  })}	  
	</div>
	<div className={'flex justify-center items-center sm-hidden font-semibold ' + text} style={{ flex: 0.25 }}>
	    <p>{date} Days</p>
	</div>
    </div>
  )
}
