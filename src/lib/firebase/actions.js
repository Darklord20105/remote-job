'use server';
import { db } from "./serverApp";
import { collection, addDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobSchema } from './validators';

// date values must be converted to strings on client side so it could work here
// in createJobPost function its by default a number from Date.now()
// while we had to convert the date in updateJobPost manually before sending
// notice we converted createdAt data to firestore timestamp for better consistency

export async function createJobPost(formData) {
  console.log(formData, 'from client');

  const processList = (name) => {
    let a = formData[name];
    if (!a) return [];
    let b = a.split(' ');
    let result = []
    b.map(i => {
      i = i.replace(/[^A-Za-z]/g, '');
      result.push(i);
    });
    return result;
  };
  const rawFormData = {
    company: formData['company'],
    role: formData['role'],
    createdAt: formData['createdAt'],
    // logo: ,
    jobClass: formData['jobClass'],
    location: formData['location'],
    salaryRangeMin: formData['salaryRangeMin'],
    salaryRangeMax: formData['salaryRangeMax'],
    verified: formData['verified'],
    hot: formData['hot'],
    jobType: formData['jobType'],
    tagList: processList('tagList'),
    priority: formData['priority'],
  };
  console.log(rawFormData, 'before validation');

  // validate data
  const myCollection = collection(db, 'jobList');
  try {
    await JobSchema.validate(rawFormData, { abortEarly: false });
  } catch (error) {
    let err = error.inner.map(i => {
      return { id: i.path, error: i.errors[0] }
    })
    const errObj = err.reduce((acc, obj) => {
      acc[obj.id] = { error: obj.error };
      return acc;
    }, {});
    console.log(errObj)
    return errObj;
  }
  // add to db
  rawFormData.createdAt = Timestamp.fromDate(new Date(rawFormData.createdAt))
  console.log(rawFormData, 'before creating document');

  try {
    const docRef = await addDoc(myCollection, rawFormData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log("Error adding document: ", error);
  }
  // update page cache and redirect
  revalidatePath('/');
  redirect('/');
}

export async function updateJobPost(formData) {
  console.log(formData, 'from client');
  
  const processList = (name) => {
    let a = formData[name];
    if (Array.isArray(a) ) return a;
    if (!a) return [];
    let b = a.split(' ');
    let result = []
    b.map(i => {
      i = i.replace(/[^A-Za-z]/g, '');
      i && result.push(i);
    });
    return result;
  };

  const rawFormData = {
    company: formData['company'],
    role: formData['role'],
    createdAt: formData['createdAt'],
    // logo: ,
    jobClass: formData['jobClass'],
    location: formData['location'],
    salaryRangeMin: formData['salaryRangeMin'],
    salaryRangeMax: formData['salaryRangeMax'],
    verified: formData['verified'],
    hot: formData['hot'],
    jobType: formData['jobType'],
    tagList: processList('tagList'),
    priority: formData['priority'],
  };
  console.log(rawFormData, 'before validation');
  
  // validate data
  try {
    await JobSchema.validate(rawFormData, { abortEarly: false });
  } catch (error) {
    let err = error.inner.map(i => {
      return { id: i.path, error: i.errors[0] }
    })
    const errObj = err.reduce((acc, obj) => {
      acc[obj.id] = { error: obj.error };
      return acc;
    }, {});
    console.log(errObj)
    return errObj;
  }
  // update in db
  const id = formData['id']
  rawFormData.createdAt = Timestamp.fromDate(new Date(rawFormData.createdAt))
  
  console.log(rawFormData, 'before update');
  const myDocument = doc(db, 'jobList', id);

  try {
    const docRef =  await updateDoc(myDocument, rawFormData)
    // const docRef = await addDoc(myDocument, rawFormData);
    console.log("Document updated");
  } catch (error) {
    console.log("Error adding document: ", error);
  }
  // update page cache and redirect
  revalidatePath('/');
  redirect('/');
}
