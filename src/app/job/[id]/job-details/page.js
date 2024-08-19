'use client';
import Image from 'next/image';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchJobById } from '../../../../lib/firebase/data';
import { useFetchData } from '../../../common/hooks/useFetchData';
import logo from '../../../assets/img/logo.jpeg';
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
  ////
  ReactJsSvg,
  NodeJsSvg,
  HtmlSvg,
  CssSvg,
} from "../../../common/svg"

// note that we need search bar appear up in everyPage
// this page would look like we expanded the job item in home page and 
// to show all tags if there is more than 3, must be no more than 10
// here is how this component would look Like
// SideDetails contains
// 1. company logo ... ok
// 2. company name ... ok
// 3. cmpany website link ... ok
// 4. apply now btn ... ok
// 5. statistics ... ok
// views number, number users applied ... ok
// share job text then input with fixed value ...

// Main Description contains
// 1. introduction section company x is hiring
// 2. job summary section (position, company, location, working hours, Role Type(job type))
// 3. about company
// 4. role overview
// 5. Key Responsibilities: unordered list text: details
// 6. tech stack : unordered list (like this nodejs, excel and stuff like this ,app or tech used in job)
// 7. Qualifications: unordered list (like this :
// Proven experience as a Senior Back End Engineer. 
// Strong proficiency in our tech stack. )
// 8. Why Join Us: resons
// 9. h1 Salary and compensation title followed by salary range
// 10. h1 Benefits summarized as unordered list
// 11. last how to apply to job box
// How to Apply: Please send your resume and a cover letter explaining why you are the perfect fit for this role.
// We look forward to your application! and button
// some warning down
// related job list as in home exactly for now its random


export default function JobDetails() {
  const { id } = useParams();
  const { data, error, loading } = useFetchData(fetchJobById, id);
  // alert(JSON.stringify(data));

  if (loading) {
    return <div>Loading...</div>;
  };

  /*if (error) {
    return <div>Error: {error}</div>;
  };*/

  return (
    <div className="bg-gray-100">
      <div className="mx-auto py-8">
      {/* <div className="container mx-auto py-8"> */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">

          <div className="col-span-4 md:col-span-3">
            <SideDetails />
          </div>

          <div className="col-span-4 md:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <Introduction />
              <AboutCompany />

              <h3 className="font-semibold text-center mt-3 -mb-2">
                Find us on
              </h3>
              <CompanySocialLinks />


              <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                  tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                  suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                  tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                  suscipit.
                </p>
              </div>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
                  <p>
                    <span className="text-gray-700 mr-2">at ABC Company</span>
                    <span className="text-gray-700">2017 - 2019</span>
                  </p>
                </div>
                <p className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                  tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                  suscipit.
                </p>
              </div>
	  /////
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

function SideDetails() {
  const skills = [
    { name: 'React', icon: <ReactJsSvg /> },
    { name: 'Node js', icon: <NodeJsSvg /> },
    { name: 'HTML 5', icon: <HtmlSvg /> },
    { name: 'CSS3', icon: <CssSvg /> },
    //{ name:'tailwindcss', icon: < />},
  ]
  // const salary = `$${salaryRangeMin}k - $${salaryRangeMax}k`  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col items-center">
        <div className='w-20 h-20 flex' >
          <Image priority src={logo} className="bg-gray-300 rounded-full mb-4 w-full h-full shrink-0" alt='company logo' />
        </div>
        <h1 className="text-xl font-bold">{'Mercedes'}</h1>
        <p className="text-gray-700 text-center">{'Senio Java Dev'}</p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Apply</a>
          <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">website</a>
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
            <p>worldwide</p>
          </li>
          <li className='mb-2 flex items-center'>
            <div className='w-6 h-6 flex mr-2' >
              <MoneyBagSvg />
            </div>
            <p>{'$25k - $75k'}</p>
          </li>
          <li className='mb-2 flex items-center'>
            <div className='w-6 h-6 flex mr-2' >
              <TemporarySvg />
            </div>
            <p>{'full time'}</p>
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

function Introduction() {
  return (
    <>
      <h2 className="text-2xl font-light  mt-6">{'Mercedes'} is Hiring :</h2>
      <h1 className="text-4xl font-bold mb-4">{'Senior Java Dev'}</h1>
    </>
  )
}

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


