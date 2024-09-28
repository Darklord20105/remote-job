import { db } from "./clientApp";
import { collection, getDocs, getDoc, query, doc, where, orderBy, startAfter, limit } from 'firebase/firestore/lite';

// will move these to utils file
// this function looks up in an array of objects
// for a term in tagList and return only objects that has matcheing element in tagList array
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

// purpose of this filter is to get only objects that has a match in its tagList array elements
// take consideration we are trying to match more than one term so it tries to get only objects 
// that has all terms specified by user query list
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

export async function fetchFilteredJobList(queryList, lastItem = null) {
  const jobRef = collection(db, 'jobList');
  console.log(queryList, 'query list in firestore get doc function');
  //alert(JSON.stringify(lastItem));
  console.log(lastItem)
  
  let filter;
  
  if (queryList.length > 0) {
    filter = query(
	jobRef, 
	where("tagList", "array-contains", queryList[0]),
	//orderBy('createdAt', 'desc'),
	//limit(10),
    );
  } else if (lastItem) {
    filter = query(
	jobRef,
        orderBy('createdAt', 'desc'),
	startAfter(lastItem.createdAt),
        limit(4),
    )
  } else { 
    filter = query(
        jobRef,
	orderBy('createdAt', 'desc'),
        limit(3),
    )
  }
  
  try {
    let snapshot = await getDocs(filter);
    let results = [];

    console.log(snapshot)
    snapshot.docs.map(doc => {
      results.push(
	{ id: doc.id, ...doc.data(), createdAt: doc['_document'].createTime.timestamp }
      )
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
