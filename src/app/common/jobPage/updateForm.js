'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import { updateJobPost } from '../../../lib/firebase/actions';
import { fetchJobById } from '../../../lib/firebase/data';
import { useFetchData } from '../hooks/useFetchData';

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

const fields = [
  { id: 'company', type: 'text', label: 'Company', placeholder: "Add company name" },
  { id: 'role', type: 'text', label: 'Role', placeholder: "Describe the role", },
  { id: 'jobClass', type: 'text', label: 'Job industry', placeholder: "Add company name" },
  { id: 'location', type: 'text', label: 'Location', placeholder: "Job location" },
  { id: 'salaryRangeMin', type: 'number', label: 'Minimum salary', placeholder: 0 },
  { id: 'salaryRangeMax', type: 'number', label: 'Maximum salary', placeholder: 0 },
  { id: 'jobType', type: 'text', label: 'Job Type', placeholder: "Job type> full time, contract, etc ...." },
  // { id: 'tagList', type: 'text', label: 'Job Tags', placeholder: "create tags by typing tag and space" },
];

const checkBoxFields = [
  { id: 'verified', type: 'checkbox', label: 'Job Trusted' },
  { id: 'hot', type: 'checkbox', label: 'Job Urgency, Popularity' },
];

const radioGroupFields = [
  { id: 'high', type: 'radio', label: 'High Priority',  },
  { id: 'medium', type: 'radio', label: 'Medium Priority' },
  { id: 'normal', type: 'radio', label: 'Normal Priority' },
]

export default function UpdateForm() {
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const { data, error, loading } = useFetchData(fetchJobById, id);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    createdAt: {},
    jobClass: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: '',
    tagList: '',
    verified: false,
    hot: false,
    priority: 'normal'
  });

  useEffect(() => {
    console.log(data)
    data && setFormData(data)
  }, [data])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit');
    let dataOut = formData;
    dataOut.createdAt = dataOut.createdAt.toDate();
    dataOut.id = id;
    console.log(dataOut, "data out")
    try {
      let m = await updateJobPost(dataOut);
      console.log(m)
      setErrors({ ...m });
    } catch (error) {
      setErrors(error);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>Error: {error}</div>;
  };
  
  return (
    <form onSubmit={handleSubmit} className='mx-4'>

      {fields.map((item) => (
        <div key={item.id} className='max-w-screen-sm mb-6'>
          <label htmlFor={item.id} className={cm.inputLabel}>{item.label}</label>
          <input
            id={item.id}
            name={item.id}
            type={item.type}
            placeholder={item.placeholder}
            defaultValue={data[item.id]}
            onChange={handleChange}
            className={cm.inputField}
          />
          {errors[item.id] && <p className="text-red-500">{errors[item.id].error}</p>}
        </div>
      ))}

      {
        <div className='max-w-screen-sm mb-6'>
        <label htmlFor='tagList' className={cm.inputLabel}>Job Tags</label>
        <input
          id='tagList'
          name='tagList'
          type='text'
          placeholder='create tags by typing tag and space'
          defaultValue={data['tagList'].join(" ")}
          onChange={handleChange}
          className={cm.inputField}
        />
        {errors['tagList'] && <p className="text-red-500">{errors['tagList'].error}</p>}
      </div>
      }
      
      {checkBoxFields.map((item) => (
        <div key={item.id} className="flex items-start mb-6">
          <div  className='flex items-center h-5' >
            <input
              id={item.id}
              name={item.id}
              type={item.type}
              // value={data[item.id]}
              onChange={handleChange}
              className={cm.checkBoxInput}
              defaultChecked={data[item.id]}
            />
            <label htmlFor={item.id} className={cm.checkBoxLabel}>{item.label}</label>
          </div>
        </div>
      ))}
      
      {radioGroupFields.map((item) => (
        <div key={item.id} className={cm.radioWrapper}>
          <input
            id={item.id}
            name='priority'
            type='radio'
            defaultValue={item.id}
            defaultChecked={data['priority'] === item.id}
            onChange={handleChange}
            className={cm.radioInput}
          />
          <label htmlFor={item.id} className={cm.radioLabel}>{item.label}</label>
        </div>
      ))}

      <button type="submit" className={cm.submitButton}>
        Update new Item
      </button>
    </form>
  )
};