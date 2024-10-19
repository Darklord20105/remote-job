'use client';
import Image from 'next/image';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchJobById } from '../../../../lib/firebase/data';
import FeedItem from '../../../common/homePage/feedItem/feedItem'
import { useFetchDataSingle } from '../../../common/hooks/useFetchData';
import { useSearchFilter } from '../../../common/hooks/useSearchFilter';
import {
  convertHtmlToReact,
  processObjectReturnTruthy,
  formatTimestampToDate, timeAgo
} from '../../../utils/helper';
import globe from '../../../assets/img/globe.svg'
import {
  LinkedinSvg,
  YoutubeSvg,
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
  GoogleSvg,
  MoneyBagSvg,
  TemporarySvg,
  EyeViewsSvg,
  ReactJsSvg,
  NodeJsSvg,
  HtmlSvg,
  CssSvg,
} from "../../../common/svg";
import chroma from "chroma-js";


const text = `
ABOUT THE ROLE

Calibrate is looking for positive, energetic, and experienced member-centric support representatives to deliver exceptional care to our valued members through multiple channels, including phone support. In this role you will be responsible for completing tasks and resolving member inquiries to deliver an excellent experience, while helping our members achieve their desired outcomes.  

The shift for this role is 11:30am-8:00pmEST. The pay rate for this role is $18.00-22.00 per hour.

KEY RESPONSIBILITIES

Efficiently manage a high volume of inbound member calls in a professional, timely and caring manner while providing accurate answers and information

Respond to inquiries from members in a timely, professional, and empathetic manner; follow-up to ensure resolution

Ensure quality member experiences are consistently delivered across channels (asynchronous messaging, phone, live chat)  following all local, state, and federal guidelines

Identify members’ needs by asking clarifying questions, researching issues and providing solutions and/or alternatives within established workflows

Engage, support, and retain members by building rapport and going the extra mile while providing compassion and empathy that results in solutions

Demonstrate Calibrate’s values with every member interaction

De-escalate situations involving dissatisfied members, offering empathetic assistance and support

Thoroughly document all member interactions, next steps and escalating to your manager as appropriate

Make outbound calls to members, labs and pharmacies as part of various workflows

Contribute to achieving Calibrate service level agreements through collaboration with team members, leaders and other departments

Support Calibrate members in a variety of areas such as responding to general program inquiries, verifying member information, processing account updates, and leverage strong computer skills and the ability to navigate through multiple systems to research information quickly and effectively

Provide accurate, valid and complete information by using the right methods/tools that align with member request and asking for support if information is incomplete

Share member feedback and information with Associate Managers in order to continuously improve and evolve the member experience

Strong interpersonal skills with the ability to build rapport quickly and communicate effectively with members and other team members of Calibrate.

Serve as a proud brand ambassador for Calibrate, consistently championing our core values

Take ownership of your personal performance including key metrics relevant to Calibrate standards

These are key responsibilities for this role but may change with evolving business needs

BACKGROUND AND EXPERIENCE

Highschool degree or equivalent required

A self-starter with the ability to hold yourself accountable in a remote working environment

Strong verbal and written communication skills. Patient, personable, and kind -- in writing, in person, on the phone, and on video

A quick learner and comfortable using a variety of applications and software, which will include practice management systems, electronic health records, and related software; must be knowledgeable in Microsoft Office, Gmail, Google Drive, and Slack and have familiarity with CRM systems and practices

Previous experience in hospitality, member services, or customer support, ideally at an early-stage startup

High level of creativity with problem-solving and troubleshooting

Adaptable and flexible to changing priorities, SLAs, workflows and organizational changes

Strong time management and organizational skills with the ability to prioritize and self-motivate to achieve and exceed personal, team and department SLAs and goals

Great active listening skills with a focus on empathy
`

function hexToRGBA(hex, opacity) {
    return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
};

export default function JobDetails() {
  const { id } = useParams();
  const { data, error, loading } = useFetchDataSingle(fetchJobById, id);
  const { handleSearch } = useSearchFilter();

  if (loading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>Error: {error}</div>;
  };
  const { company, position, jobType, tagList, location,
    createdAt, logo, bgColorToggle, bgColorName,
    salaryRangeMin, salaryRangeMax, jobDescription,
    benefits, applyDetails, applyUrl, website,
    jobClass, verified, hot, priority } = data;

  const benefitList = processObjectReturnTruthy(benefits);
  const formattedDate = formatTimestampToDate(createdAt);
  const timeAgoPeriod = timeAgo(formattedDate);
  const jobDescriptionParsedContent = convertHtmlToReact(jobDescription);
  console.log(formattedDate);
  // Example using chroma.js
  let userColor = chroma(bgColorName).brighten(1.5).hex(); // Lighten the color
  // Determine if the background is light or dark based on luminance
  let luminance = chroma(bgColorName).luminance();

  // If the color is light, set the text to black; if it's dark, set it to white
  let textColor = luminance > 0.5 ? '#000000' : '#FFFFFF';


  return (
    <div className="-mx-4  sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col">
	<FeedItem data={{...data, expand: true}} />
	  {/* expanded card to show all details start*/}
	<div 
	  className='h-full bg-white mx-1 -mt-2 py-2  border-solid border-slate-500 border rounded-lg' 
	  style={{ borderRadius:'0px 0px 8px 8px', borderTop:'none'}}>
	  {/* S1 */}
	  <div className='flex justify-between items-center px-4 -mt-4' 
	    style={{
	      background: 'rgb(255,0,255)', 
	      background: `linear-gradient(180deg, 
		${hexToRGBA(userColor, 1)} 0%,
		rgba(255,255,255,1) 100%)`}}
	  >                    
	    <div className='mt-6'>
	      <h2 className="text-3xl font-light  mt-6">
	  	{company} is Hiring :
	      </h2>
        	<h1 className="text-4xl font-bold mb-4">{position}</h1>
	    </div>
	    <p>
	      <span className="text-gray-700 mr-2">{timeAgoPeriod}, </span>
	      <span className="text-gray-700">{formattedDate}</span>
            </p>
          </div>
	  {/* S1 */}
	  {/* S2 */}
	  <div className='px-4'>
	    <div className="bg-white shadow rounded-lg p-6 ml-8 my-4 inline float-right">
	      <SideDetails 
	        data={{
		  company, position, location, logo, website, applyUrl, 
		  salaryRangeMin, salaryRangeMax, jobType, tagList 
	        }}
	      />
	    </div>
	   <p className='text-justify mr-2' style={{textAlign:'justify'}}>
	    {jobDescriptionParsedContent}</p>
	  </div>
	  
	  {/* S2 */}
	  {/* S3 */}
	  <div className='flex justify-center my-4'>
	    <ApplyDetails data={{ applyDetails, applyUrl }} />
	  </div>
	  {/* S3 */}
	</div>
	{/* expanded card to show all details End */}
    </div>
  )
};

function SideDetails({ data: {
  company, position, location, website, applyUrl, salaryRangeMin, logo, salaryRangeMax, jobType, tagList
} }) {                                    
  const skills = [
    { name: 'React', icon: <ReactJsSvg /> },
    { name: 'Node js', icon: <NodeJsSvg /> },
    { name: 'HTML 5', icon: <HtmlSvg /> },
    { name: 'CSS3', icon: <CssSvg /> },
  ]
  const salary = `$${salaryRangeMin / 1000}k - $${salaryRangeMax / 1000}k`
  return (
    <>
      <div className="flex flex-col items-center">
        <div className='w-20 h-20 flex' >
          {logo ? <Image priority src={logo} width={80} height={80} className="bg-gray-300 rounded-full mb-4 w-full h-full shrink-0" alt='company logo' placeholder='empty' /> :
            <RenderTextLogo props={{ company }} />}
        </div>
        <h1 className="text-xl font-bold">{company}</h1>
        <p className="text-gray-700 text-center">{position}</p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <a target={'_blank'} href={applyUrl} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Apply</a>
          <a target={'_blank'} href={website} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">website</a>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
	{/*
      <div className="flex flex-col items-center text-center text-sm">
        <div className='mb-2 flex items-center'>
          <div className='w-6 h-6 mr-2' >
            <EyeViewsSvg />
          </div>
          <p>2456 views </p>
        </div>
        <p> 654 applied </p>
        <a href='#'>Share this job</a>
      </div>

      <hr className="my-6 border-t border-gray-300" />
      */}
      <div className="flex flex-col justify-center items-center">
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">HighLights</span>
        <ul>
          <li className='mb-2 flex  items-center'>
            <div className='w-6 h-6  mr-2' >
              <Image
                priority
                src={globe}
                width='100%'
                height='100%'
                alt='icon'
              />
            </div>
            <p>{location}</p>
          </li>
          <li className='mb-2 flex items-center'>
            <div className='w-6 h-6 flex mr-2' >
              <MoneyBagSvg />
            </div>
            <p>{salary}</p>
          </li>
          <li className='mb-2 flex items-center'>
            <div className='w-6 h-6 flex mr-2' >
              <TemporarySvg />
            </div>
            <p>{jobType}</p>
          </li>
        </ul>
	{/*
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
        <ul>
          {
            skills.map(item => {
              return (
                <li key={item + 'hfd'} className="mb-2 flex items-center">
                  <div className='w-6 h-6 flex mr-2' >
                    {item.icon}
                  </div>
                  <p>{item.name}</p>
                </li>)
            })
          }
        </ul>*/}
      </div>
    </>
  )
};

function RenderTextLogo({ props: { company } }) {
  const text = company.split(" ").map(letter => letter[0]).join('').slice(0, 2).toUpperCase();
  return (<div className='rounded-full bg-white w-full h-full text-black flex justify-center items-center text-3xl font-bold border'>{text}</div>)
}

function ApplyDetails({ data: { applyDetails, applyUrl } }) {
  const applyDetailsParsedContent = convertHtmlToReact(applyDetails, ["width"]);
  console.log(applyDetails);
  return (
    <div class="relative flex flex-col gap-4 text-center max-w-lg border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500 ">
      <h2 class="text-xl font-bold text-gray-900 mb-2 capitalize transition-all duration-500 ">HOW TO APPLY</h2>
      <div class="w-full mb-5">
        {applyDetailsParsedContent}
      </div>
      <a href={applyUrl} target="_blank" class="bg-indigo-600 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold">APPLY HERE</a>
    </div>
  )
}
