"use client"
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';

import { createJobPost, updateJobPostWithImage } from '../../../lib/firebase/actions';
import { uploadImage } from '../../../lib/firebase/storage';

import { PlusSvg, FileSvg, FolderOpenSvg } from '../svg'
import { UploadImg } from '../forms/uploadImg';
import { SpecialInputDropDownWrapper } from '../forms/specialInputDropDown';
import { SpecialInputDropDownSingleWrapper } from "../forms/specialInputDropDownSingle"
import { RichTextEditor } from "../forms/richTextEditor"

// this object was intended to replace string classes with simple object but for the sake of speeding up development it's now not used, it must be moved to constants folder
const cm = {
  inputLabel: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
  inputField: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
  checkBoxLabel: 'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300',
  checkBoxInput: 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800',
  radioWrapper: "flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700",
  radioLabel: 'w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300',
  radioInput: 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
  submitButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
};

const companyInfoFields = [
  { id: 'company', type: 'text', label: 'company', placeholder: "Add Company Name", helperText: "Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc." },
  { id: 'position', type: 'text', label: 'position', placeholder: "Position", helperText: 'Please specify as single job position like "Marketing Manager" or "Node JS Developer", not a sentence like "Looking for PM / Biz Dev / Manager". We know your job is important but please DO NOT WRITE IN FULL CAPS. If posting multiple roles, please create multiple job posts. A job post is limited to a single job. We only allow real jobs, absolutely no MLM-type courses "learn how to work online" please.' },
];

const employmentTypeField = {
  id: 'jobType',
  label: "employment type",
  placeholder: 'Choose Employnent Status',
  helperText: "",
  options: [
    { oid: 'Full-Time', val: 'Full-Time' },
    { oid: 'Part-time', val: 'Part-time' },
    { oid: 'Contractor', val: 'Contractor' },
    { oid: 'Temporary', val: 'Temporary' },
    { oid: 'Internship', val: 'Internship' },
    { oid: 'Volunteer', val: 'Volunteer' },
    { oid: 'OnSite', val: 'OnSite' },
  ]
}

const tagListDropDownSelector = {
  id: 'tagList',
  label: "Tags, keywords or stack",
  placeholder: 'type a Tag or keyword to search and add it',
  helperText: "Short tags are preferred. If by any chance you needed more than one word, please seperate them with a dash ("-") ,Use tags like industry and tech stack. The first 3 or 4 tags are shown on the site, the other tags aren't but the job will be shown on each tag specific page (like /remote-react-jobs). We also sometimes generate tags automatically after you post/edit to supplement.",
  options: [
    { oid: 'engineer', val: 'engineer', oicon: <PlusSvg /> },
    { oid: 'executive', val: 'executive', oicon: <PlusSvg /> },
    { oid: 'senior', val: 'senior', oicon: <PlusSvg /> },
    { oid: 'developer', val: 'developer', oicon: <PlusSvg /> },
    { oid: 'finance', val: 'finance', oicon: <PlusSvg /> },
    { oid: 'sys-admin', val: 'sys admin', oicon: <PlusSvg /> },
    { oid: 'javaScript', val: 'javaScript', oicon: <PlusSvg /> },
  ],
  allowDefaultValue: false,
}
const locationDropDownSelector = {
  id: 'location',
  label: "Job is restricted to locations?",
  placeholder: 'Type a location this job is restricted to like Worldwide, Europe, or Netherlands',
  helperText: `If you'd only like to hire people from a specific location or timezone this remote job is restricted to (e.g. Europe, United States or Japan). If not restricted, please leave it as "Worldwide". The less restricted this is, the more applicants you will get. Keeping it "Worldwide" is highly recommended as you'll have access to a worldwide pool of talent. To promote fairness in remote work positions, worldwide jobs are ranked higher.`,
  options: [
    { oid: 'worldwide', val: 'worldwide', oicon: <PlusSvg /> },
    { oid: 'usa', val: 'usa', oicon: <PlusSvg /> },
    { oid: 'canada', val: 'canada', oicon: <PlusSvg /> },
    { oid: 'india', val: 'india', oicon: <PlusSvg /> },
  ],
  allowDefaultValue: true,
};

const checkBoxHighLightField = { id: 'bgColorToggle', type: 'checkbox', label: "Highlight with your company's 🌈 brand color", helperText: null }
const checkBoxHighLightFieldColor = { id: 'bgColorName', type: 'color', label: "Choose your company's 🌈 brand color", helperText: null }

const salaryRangeMinDropDownSelector = {
  id: 'salaryRangeMin',
  label: null,
  placeholder: 'Type minimum salary',
  helperText: null,
  options: [
    { oid: 'USD 10000 per year', val: '10000' },
    { oid: 'USD 20000 per year', val: '20000' },
    { oid: 'USD 30000 per year', val: '30000' },
    { oid: 'USD 40000 per year', val: '40000' },
  ],
  allowDefaultValue: false,
}

const salaryRangeMaxDropDownSelector = {
  id: 'salaryRangeMax',
  label: null,
  placeholder: 'Type max salary',
  helperText: null,
  options: [
    { oid: 'USD 10000 per year', val: '10000' },
    { oid: 'USD 20000 per year', val: '20000' },
    { oid: 'USD 30000 per year', val: '30000' },
    { oid: 'USD 40000 per year', val: '40000' },
  ],
  allowDefaultValue: false,
}

const BenefitFields = [
  { id: 'plus401k', type: 'checkbox', label: '401(k)' },
  { id: 'distributed_team', type: 'checkbox', label: 'Distributed team' },
  { id: 'async', type: 'checkbox', label: 'Async' },
  { id: 'vision_insurance', type: 'checkbox', label: 'Vision insurance' },
  { id: 'dental_insurance', type: 'checkbox', label: 'Dental insurance' },
  { id: 'medical_insurance', type: 'checkbox', label: "Medical insurance" },
  { id: 'unlimited_vacation', type: 'checkbox', label: 'Unlimited vacation' },
  { id: 'paid_time_off', type: 'checkbox', label: 'Paid time off' },
  { id: '4_day_workweek', type: 'checkbox', label: '4 day workweek' },
  { id: 'learning_budget', type: 'checkbox', label: 'Learning budget' },
  { id: 'free_gym_membership', type: 'checkbox', label: 'Free gym membership' },
];

const applyUrlField = {
  id: 'applyUrl',
  type: 'text',
  label: 'Apply URL',
  placeholder: "https://",
  helperText: "If you'd like to use your own apply form or ATS you can enter the URL here for people to apply. Jobs that use our own Applicant AI ATS generally receive more applicants."
}

const companyWebsiteField = {
  id: 'website',
  type: 'url',
  label: 'Company Website',
  placeholder: "www.example.com",
  helperText: "If you'd like to use your own apply form or ATS you can enter the URL here for people to apply. Jobs that use our own Applicant AI ATS generally receive more applicants."
}


// const checkBoxFields = [
//   { id: 'verified', type: 'checkbox', label: 'Job Trusted' },
//   { id: 'hot', type: 'checkbox', label: 'Job Urgency, Popularity' },
// ];

// const radioGrouoFields = [
//   { id: 'high', type: 'radio', label: 'High Priority' },
//   { id: 'medium', type: 'radio', label: 'Medium Priority' },
//   { id: 'normal', type: 'radio', label: 'Normal Priority' },
// ]

function FormGroup({ children }) {
  return (
    <div className="mx-auto w-full bg-white rounded-lg my-6 shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 h-1 bg-blue-500" style={{ width: '33%' }}></div>
      </div>
      <div className="p-6"> {/* section wraper */}
        {/*Logo and Title */}
        {children}

      </div>
    </div>
  )
}

export default function CreateForm() {
  const [errors, setErrors] = useState({});
  const [loadFile, setLoadFile] = useState(null);
  const router = useRouter()
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    jobType: '',
    tagList: [],
    location: [],

    logo: '',
    bgColorToggle: false,
    bgColorName: '#ffffff',
    salaryRangeMin: '',
    salaryRangeMax: '',
    jobDescription: '',
    benefits: {},
    applyDetails: '',
    applyUrl: '',
    website: '',

    jobClass: 'test',
    verified: false,
    hot: false,
    priority: 'normal'
  });

  useEffect(() => {
    //alert(JSON.stringify(formData));
    // console.log(formData, 'curren form data')
  }, [formData])

  // handlw any single input or option or checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    //
    if (name === 'bgColorToggle') {
      if (formData['bgColorToggle'] === !checked) {
        setFormData((prev) => ({
          ...prev,
          ['bgColorName']: '#ffffff',
        }));
      }
    }
    //
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // benefit section multiplie checkboxes
  const handleMultiplieChange = (e, groupName) => {
    const { name, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [groupName]: { ...prev[groupName], [name]: checked }
      }));
    }
  };

  const preventDuplicateFilter = (arr) => {
    let a = new Set(arr);
    return [...a]
  }

  //  input with drop down suggestion
  const handleSpecialInputDropDown = (fid, values) => {
    setFormData((prev) => {
      return { ...prev, [fid]: preventDuplicateFilter([...values.map(i => i.id)]) }
    });

  }
  const handleSpecialInputDropDownSingleChoice = (fid, value) => {
    setFormData(prev => {
      return { ...prev, [fid]: value }
    });
  }

  const handleUploadLogo = (img, fid) => {
    alert(JSON.stringify(img));
    setFormData(prev => {
      return { ...prev, [fid]: img }
    })
  }

  const handleTextEditorOutput = (text, fid) => {
    setFormData(prev => {
      return { ...prev, [fid]: text };
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit');
    try {
      let response = await createJobPost(formData)
      if (response.message === "error") setErrors({ ...response.error })
      console.log(response)
      if (loadFile) {
        let responseFileUrl = await uploadImage(response.docId, loadFile)
        console.log("success upload image", responseFileUrl)
        await updateJobPostWithImage(response.docId, responseFileUrl)
      }
      router.push("/")

    } catch (error) {
      console.log(error, 'error x')
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="w-full relative mx-auto mt-16 mx-6 bg-white shadow-xl rounded-lg text-gray-900">

      <FormGroup>
        {/* company name && position */}
        <div className='mb-4'>
          {companyInfoFields.map((item) => (
            <div className="block w-full mb-4" key={item.id}>
              <div className="relative">
                <label htmlFor={item.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{item.label}</label>
                <input
                  id={item.id}
                  name={item.id}
                  type={item.type}
                  placeholder={item.placeholder}
                  value={formData[item.id]}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                  required
                />
              </div>
              <span className="text-xs text-gray-400 font-normal mt-2 block">{item.helperText}</span>
              {errors[item.id] && <span className="text-xs text-red-400 font-normal mt-2 block">
                {errors[item.id].error}</span>}
            </div>
          ))}
        </div>

        {/* employment Type option menu */}
        <div className='mb-4'>
          <div className="block w-full">
            <div className="relative">
              <label for={employmentTypeField.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{employmentTypeField.label}</label>
              <select id={employmentTypeField.id} name={employmentTypeField.id} className="appearance-none block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" onChange={handleChange} required>
                <option disabled selected>{employmentTypeField.placeholder}</option>
                {employmentTypeField.options.map(i => {
                  return <option value={i.val}>{i.oid}</option>
                })}
              </select>
            </div>
            {errors[employmentTypeField.id] && <span className="text-xs text-red-400 font-normal mt-2 block"> {errors[employmentTypeField.id].error} </span>}
          </div>
        </div>

        {/* tag list drop down input */}
        <div className='mb-4'>
          <SpecialInputDropDownWrapper
            data={{
              ...tagListDropDownSelector,
              handleSpecialInputDropDown,
              id: 'tagList',
              validationError: errors['tagList']
            }} />
        </div>

        {/* location drop down input */}
        <div className='mb-4'>
          <SpecialInputDropDownWrapper
            data={{
              ...locationDropDownSelector,
              handleSpecialInputDropDown,
              id: 'location',
              validationError: errors['location']
            }} />
        </div>
      </FormGroup>

      <FormGroup>
        {/*image logo upload*/}
        <div className='mb-4'>
          <div className="flex items-center mb-6">
            <img src={formData["logo"] ? formData["logo"] : "/logo.jpeg"} alt="Logo" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Company logo </h2>
              <p className="text-gray-500">(.JPG or .PNG, square or round)</p>
            </div>
          </div>
          <UploadImg data={{ handleUploadLogo, id: "logo", helperText: "company logo is the image displayed on job post, having a company logo delivers an idea that your company is legit, in Case you choose not to add one or forgot to , the first Letters of your company name will be displayed", setLoadFile }} />
        </div>

        {/* highlight job post check box */}
        <div className='mb-4'>
          <div className="block w-full mb-4">
            <div className="relative flex items-center">
              <input
                id={checkBoxHighLightField.id}
                name={checkBoxHighLightField.id}
                type={checkBoxHighLightField.type}
                // placeholder={checkBoxHighLightField}
                checked={formData[checkBoxHighLightField.id] ? true : false}
                onChange={handleChange}
                className="w-5 h-5 appearance-none border cursor-pointer border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
              />
              <label htmlFor={checkBoxHighLightField.id} className="text-sm font-normal cursor-pointer text-gray-600">{checkBoxHighLightField.label}</label>
            </div>
            {checkBoxHighLightField.helperText && <span className="text-xs text-gray-400 font-normal mt-2 block">{checkBoxHighLightField.helperText}</span>}
          </div>
          {/* highlight job post color picker */}
          <div className="block w-full mb-4">
            <div className="relative flex items-center">
              <input
                id={checkBoxHighLightFieldColor.id}
                name={checkBoxHighLightFieldColor.id}
                type={checkBoxHighLightFieldColor.type}
                value={formData[checkBoxHighLightFieldColor.id]}
                disabled={!formData['bgColorToggle']}
                onChange={handleChange}
                className="w-8 h-6 appearance-none border cursor-pointer border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
              />
              <label htmlFor={checkBoxHighLightFieldColor.id} className="text-sm font-normal cursor-pointer text-gray-600">{checkBoxHighLightFieldColor.label}</label>
            </div>
            {checkBoxHighLightFieldColor.helperText && <span className="text-xs text-gray-400 font-normal mt-2 block">{checkBoxHighLightFieldColor.helperText}</span>}
          </div>
          {/*  */}
        </div>

        {/* salary range fields */}
        <div className='mb-4'>
          <label className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">
            Annual Salary or Compensation in USD (Gross, Annualized, Full-Time-Equivalent (FTE) in USD equivalent)
          </label>
          <div className="w-full flex">
            <SpecialInputDropDownSingleWrapper
              data={{ ...salaryRangeMinDropDownSelector, handleSpecialInputDropDownSingleChoice, id: "salaryRangeMin" }} />
            <div className='w-6'></div>
            <SpecialInputDropDownSingleWrapper
              data={{ ...salaryRangeMaxDropDownSelector, handleSpecialInputDropDownSingleChoice, id: "salaryRangeMax" }} />
          </div>
          <span className="text-xs text-gray-400 font-normal mt-2 block">
            It's illegal to not share salary range on job posts since 2021. Posts without salary will automatically show an estimate of salary
            based on similar jobs. Remote job postings are legally required to show a salary compensation range in many U.S. states and countries.
            Google does NOT index jobs without salary data. If it's a short-term gig, use the annual full-time equivalent.
            For example, if it's a 2-week project for $2,000, the annual equivalent would be $2,000 / 2 weeks * 52 weeks = $52,000.
            Please use USD equivalent. We don't have currency built-in yet and we'd like to use this salary data to show salary trends in remote work.
            Remote OK is a supporter of #OpenSalaries
          </span>
          {errors['salaryRangeMin'] &&
            <span className="text-xs text-red-400 font-normal mt-2 block">{errors['salaryRangeMin'].error}</span>}
          {errors['salaryRangeMax'] && <span className="text-xs text-red-400 font-normal mt-2 block">{errors['salaryRangeMax'].error}</span>}
        </div>

        {/* job description text editor */}
        <div className='mb-4'>
          <label className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">
            Job description
          </label>
          <Suspense key={'strawberry'} fallback={<h1>loading...</h1>}>
            <RichTextEditor data={{
              handleTextEditorOutput, id: 'jobDescription',
              validationError: errors['jobDescription']
            }} />
          </Suspense>
        </div>

        {/* Benefits checkboxes */}
        <div className='mb-4'>
          <label className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">
            Benefits
          </label>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {BenefitFields.map(item => (
              <div>
                <label for={item.id}
                  style={{ background: formData.benefits[item.id] ? "red" : "white" }}
                  className="px-6 py-2 text-sm font-medium text-gray-900 dark:text-gray-300 border border-gray-300 rounded-full">
                  <span style={{ color: formData.benefits[item.id] ? "white" : "black" }}>{item.label}</span>
                  <input
                    onChange={(e) => handleMultiplieChange(e, 'benefits')}
                    id={item.id}
                    name={item.id}
                    type="checkbox"
                    className="w-12 h-6 opacity-0"
                    value={formData.benefits[item.id]}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* how to apply */}
        <div className='mb-4'>
          <label className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">
            How to apply?
          </label>
          <Suspense key={'banana'} fallback={<h1>loading...</h1>}>
            <RichTextEditor data={{
              handleTextEditorOutput, id: 'applyDetails',
              validationError: errors['applyDetails']
            }} />
          </Suspense>
        </div>

        {/* apply url field */}
        <div className='mb-4'>
          <div className="block w-full mb-4">
            <div className="relative">
              <label htmlFor={applyUrlField.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{applyUrlField.label}</label>
              <input
                id={applyUrlField.id}
                name={applyUrlField.id}
                type={applyUrlField.type}
                placeholder={applyUrlField.placeholder}
                value={formData[applyUrlField.id]}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                required
              />
            </div>
            <span className="text-xs text-gray-400 font-normal mt-2 block">{applyUrlField.helperText}</span>
            {errors[applyUrlField.id] && <span className="text-xs text-red-400 font-normal mt-2 block">
              {errors[applyUrlField.id].error}</span>}
          </div>
        </div>

        {/*  companyWebsiteField  */}
        <div className='mb-4'>
          <div className="block w-full mb-4">
            <div className="relative">
              <label htmlFor={companyWebsiteField.id} className="flex uppercase items-center mb-2 text-gray-600 text-xs font-bold">{companyWebsiteField.label}</label>
              <input
                id={companyWebsiteField.id}
                name={companyWebsiteField.id}
                type={companyWebsiteField.type}
                placeholder={companyWebsiteField.placeholder}
                value={formData[companyWebsiteField.id]}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                required
              />
            </div>
            <span className="text-xs text-gray-400 font-normal mt-2 block">{companyWebsiteField.helperText}</span>
            {errors[companyWebsiteField.id] && <span className="text-xs text-red-400 font-normal mt-2 block"> {errors[companyWebsiteField.id].error}</span>}
          </div>
        </div>

        <button onClick={handleSubmit} className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">SUBMIT</button>

      </FormGroup>
    </form>
  )
}

/*
      {checkBoxFields.map((item) => (
        <div key={item.id} className="flex items-start mb-6">
          <div key={item.id} className={'flex items-center h-5'} >
            <input
              id={item.id}
              name={item.id}
              type={item.type}
              value={formData[item.id]}
              onChange={handleChange}
              className={cm.checkBoxInput}
            />
            <label htmlFor={item.id} className={cm.checkBoxLabel}>{item.label}</label>
          </div>
        </div>
      ))}

      {radioGrouoFields.map((item) => (
        <div key={item.id} className={cm.radioWrapper}>
          <input
            id={item.id}
            name='priority'
            type='radio'
            value={item.id}
            checked={formData['priority'] === item.id}
            onChange={handleChange}
            className={cm.radioInput}
          />
          <label htmlFor={item.id} className={cm.radioLabel}>{item.label}</label>
        </div>
      ))}

      <button type="submit" className={cm.submitButton}>
        create new Item
      </button>
*/



/*
function Card() {
  return (
    <a
      class="relative block p-8 overflow-hidden border bg-white border-slate-100 rounded-lg ml-6 mr-6 mt-6"
      href=""
    >
      <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
      ></span>

      <div class="justify-between sm:flex">
        <div>
          <h5 class="text-xl font-bold text-slate-900">
            Building a beautiful product as a software developer
          </h5>
          <p class="mt-1 text-xs font-medium text-slate-600">By Ana Doe</p>
        </div>
      </div>

      <div class="mt-4 sm:pr-8">
        <p class="text-sm text-slate-500">
          Open source Tailwind UI components and templates to
          bootstrap your new apps, projects or landing sites! Open source Tailwind UI.
        </p>
      </div>

      <dl class="flex mt-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-slate-600">Published</dt>
          <dd class="text-xs text-slate-500">31st June, 2022</dd>
        </div>

        <div class="flex flex-col-reverse ml-3 sm:ml-6">
          <dt class="text-sm font-medium text-slate-600">Reading time</dt>
          <dd class="text-xs text-slate-500">5 minutes</dd>
        </div>
      </dl>

    </a>
  )
}
*/
