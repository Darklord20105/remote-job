import { db } from "./clientApp";
import { collection, getDocs, getDoc, query, doc, where } from 'firebase/firestore/lite';

// will move these to utils file
function customFilter(arr, term) {
  var matches = [];
  if (!Array.isArray(arr)) return matches;

  arr.forEach(function (i) {
    if (i.tagList.includes(term)) {
      matches.push(i);
    }
  });

  return matches;
}

function gFilter(array, list, index = 1) {
  let inner = [];
  inner = customFilter(array, list[index]);

  console.log(index + ' index versus querylist length ' + list.length);
  console.log(inner, 'inner now before condition');
  if (Number(index) < Number(list.length -1)) {
    index = index + 1;
    console.log('condition ok next index is: ', index);
    console.log('shit list to next stage is: ', inner);
    return gFilter(inner, list, index = index);
  }
  console.log('shit list', inner); 
  return inner;
}

export async function fetchFilteredJobList(queryList) {
  const jobRef = collection(db, 'jobList');
  console.log(queryList, 'query list in firestore get doc function');
  
  let filter;
  
  if (queryList.length > 0) {
    filter = query(jobRef, where("tagList", "array-contains", queryList[0]) );
  } else { 
    filter = jobRef; 
  }
  
  try {
    let snapshot = await getDocs(filter);
    let results = [];

    console.log(snapshot)
    snapshot.docs.map(doc => {
      results.push({ id: doc.id, ...doc.data(), createdAt: doc['_document'].createTime.timestamp })
    });

    console.log(results)
    if (queryList.length > 1) {
      return gFilter(results, queryList);
    }
    return results;

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
