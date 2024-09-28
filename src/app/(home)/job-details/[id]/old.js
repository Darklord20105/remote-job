'use client';
import Image from 'next/image';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchJobById } from '../../../../lib/firebase/data';
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
} from "../../../common/svg"

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
  const jobDescriptionParsedContent = convertHtmlToReact(jobDescription)
  console.log(formattedDate);

  return (
    <div className="bg-gray-100 mx-auto w-full max-w-6xl px-6 modified">
      {/* <div className="bg-gray-100"> */}
      <div className="mx-auto py-8">
        {/* <div className="container mx-auto py-8"> */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">

          <div className="col-span-4 md:col-span-3">
            <SideDetails data={{
              company, position, location, logo, website, applyUrl, salaryRangeMin,
              salaryRangeMax, jobType, tagList
            }} />
          </div>

          <div className="col-span-4 md:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className='flex justify-between items-center gap-2 '>
                <div>
                  <h2 className="text-2xl font-light  mt-6">{company} is Hiring :</h2>
                  <h1 className="text-4xl font-bold mb-4">{position}</h1>
                </div>
                <p>
                  <span className="text-gray-700 mr-2">{timeAgoPeriod}, </span>
                  <span className="text-gray-700">{formattedDate}</span>
                </p>
              </div>

              {/* Tag list section start */}
              <div className="mb-6 mt-4">
                <h2 className="text-xl font-bold mt-6 mb-4">Job Tags</h2>
                <p className="flex gap-3">
                  {tagList.map(i => {
                    return <Tag key={i} data={{ text: i, handleSearch }} />
                  })}
                </p>
              </div>

              <AboutCompany />

              <h3 className="font-semibold text-center mt-3 -mb-2">
                Find us on
              </h3>
              <CompanySocialLinks />


              {/* tag list section end */}

              {/* job Description start */}
              <div className="mb-6">
                <div className="flex justify-between items-center flex-wrap gap-2 w-full">
                  <h2 className="text-xl font-bold mt-6 mb-4">Job Description</h2>
                  {/* <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p> */}
                </div>
                <div className="mt-2" >
                  {jobDescriptionParsedContent}
                </div>
              </div>
              {/* job Description end */}
              {/* benefits section start */}
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <h2 className="text-xl font-bold mt-6 mb-4">Benefits</h2>
                  {/* <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p> */}
                </div>
                <div>
                  <ul className='flex flex-col divide-y divide-gray-200'>
                    {benefitList.map(item => <li className='inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-900' key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              {/* benefits section end */}
              <div className='flex justify-center'>
                <ApplyDetails data={{ applyDetails, applyUrl }} />
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

function RenderTextLogo({ props: { company } }) {
  const text = company.split(" ").map(letter => letter[0]).join('').slice(0, 2).toUpperCase();
  return (<div className='rounded-full bg-white w-full h-full text-black flex justify-center items-center text-3xl font-bold border'>{text}</div>)
}

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
    <div className="bg-white shadow rounded-lg p-6">
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
      <div className="flex flex-col">
        <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">HighLights</span>
        <ul>
          <li className='mb-2 flex items-center'>
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
                ;
            })
          }
        </ul>
      </div>
    </div>
  )
};

function MainDescription() {
  return (
    <></>
  )
};

function AboutCompany() {
  return (
    <>
      <h3 className="text-l font-bold mb-4">About Our Company</h3>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper,
        ut vestibulum velit convallis. Aenean posuere risus non velit egestas
        suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
        et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
        luctus risus rhoncus id.
      </p>
    </>
  )
}

const loadSocialLinks = [
  { name: "LinkedIn", svg: <LinkedinSvg />, url: "https://linkedin.com", },
  { name: "YouTube", svg: <YoutubeSvg />, url: "https://youtube.com", },
  { name: "Facebook", svg: <FacebookSvg />, url: "https://facebook.com", },
  { name: "Instagram", svg: <InstagramSvg />, url: "https://instagram.com", },
  { name: "Twitter", svg: <TwitterSvg />, url: "https://twitter.com", },
  { name: "Google", svg: <GoogleSvg />, url: "https://google.com", }
]

function CompanySocialLinks() {
  return (
    <div className="flex justify-center items-center gap-6 my-6">
      {loadSocialLinks.map(item => (
        <Link key={item.url} className="text-gray-700 hover:text-orange-600" href={item.url} target="_blank">
          {item.svg}
        </Link>
      ))}
    </div>
  )
}

function Tag({ data: { text, handleSearch } }) {
  return (
    <div className="border-grey rounded-[0.5em] text-black bg-white text-[12px] font-bold px-[0.75rem] py-[0.5rem] cursor-pointer flex justify-center items-center gap-1 border-solid border-slate-300 border" onClick={() => handleSearch(text)}>
      <p>{text}</p>
    </div>
  )
}

function ApplyDetails({ data: { applyDetails, applyUrl } }) {
  const applyDetailsParsedContent = convertHtmlToReact(applyDetails, ["width"])
  console.log(applyDetails)
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
