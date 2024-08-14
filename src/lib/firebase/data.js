import { db } from "./clientApp";
import { collection, getDocs, getDoc, query, doc, where, orderBy, limit } from 'firebase/firestore/lite';

export async function fetchFilteredJobList(queryList) {
  const jobRef = collection(db, 'jobList');
  console.log(queryList, 'query list in firestore get doc function');
  
  let filter;
  
  if (queryList.length > 0) {
    filter = query(jobRef, where("tagList", "array-contains-any", queryList) );
  } else { 
    filter = jobRef; 
  }
  
  try {
    let snapshot = await getDocs(filter);
    console.log(snapshot, 'data from firestore snapshot');

    return snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });
  }
  catch (error) {
    let message = "couldn't get job list , reason: " + error.message;
    console.log(message);
    return { message: message }
  }
}

export async function fetchJobById(id) {
  try {
    const jobRef = doc(db, 'jobList', id);
    const snapshot = await getDoc(jobRef);
    if (snapshot.exists()) {
      console.log(snapshot.data(), 'data from firestore snapshot');
      return snapshot.data()
    } else {
      console.log("No such document");
      return { message: 'no such document' }
    }
  } catch (error) {
    let message = "couldn't get job item , reason: " + error.message;
    console.log(message, "error get job by id");
    return { message: message }
  }
}
