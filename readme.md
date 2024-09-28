////////////
h1: tags must be single word or more than word without spaces

project direction shift
- search bar should always be present and can stack more than one filter in url params ... ok

- - search bar should always be present in home page and job details page ... pending

- filters can be added on top of each other ... ok

- note when we click on a tags we are redirected to home page and get items that match this criteria , under the search the criteria or (could be more than one )is displayed with close x to clear this filter and other box to clear all the result contains results number ... ok

- if we did a search with more than one citeria ,closing the criteria reloads to get result with remaining criteria only with clear all box ... ok

- under search bar in details page show goback to home btn ... pending

- when going to details page display the same component as in home page but expand it up and down to show all tags if there is more than 3, must be no more than 10 .. pending
- page job details must look like we expanded the job item ... pending

- note that when going to details page we want same list of jobs in home page as related jobs with infinite scroll
when click on tag start a search with that filter ... pending

to something like a hook or HOC ,must move logic for sending data to params to a single function to be able to use it later like when you click on a tag you trigger a search ... pending
//////////////

Home Page Job item structure

id: String random, 

company:String, /* company name */

role: String, 
/* job role dsecription */

createdAt: Date String, 
/* date when the entry is created */

logo: null || url String,  /* in case of null the first letters of the company name String will be rendered */

jobClass: String probably has predefined option in DB to avoid confusion
/* industry where role is offered IT, translate ...etc */

location: String probably has predefined option in DB to select specific countries
/* job location availability */

salaryRangeMin: Number, 
salaryRangeMax: Number, 
min and max both has values as Numbers /* salary range offered */

verified: Boolean *optional not required*
/* indicator that company has trusted info , not scam */

hot: Boolean *optional not required*
/* indicator that the job has high demand by users */

jobType: String  *optional not required*
/* indicator job state , full time , contract, temporary

tagList: ['developer', 'javascript', 'react', 'backend', 'mongodb'],
Array of Strings 
/* job tags so it cqn be found easily */

*optional not required*
priority: String with 3 options (high, medium, normal) *optional not required*
/*  used to change background color of important jobs or good jobs or normal jobs */

----------
pull recent repo but no changes locally

If you don't care about any local changes (including untracked or generated files or subrepositories which just happen to be here) and just want a copy from the repo:

git reset --hard HEAD
git clean -xffd
git pull

Again, this will nuke any changes you've made locally so use carefully. Think about rm -Rf when doing this.

----------
this qpp has two firebase entry files
clientApp.js
the imports used in this file can only be used in client side with 'use client' tag


serverApp.js
the imports used in this file can only be used on server rendered componemts with 'use server' tag, 
note that server rendered pages are the ones rendered implicitly by next js routing , and you can't use hooks in them.

-----
URL SEARCH PARAMS
---
must import these
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

# in the component
const searchParams = useSearchParams();
const pathname = usePathname();
const { replace } = useRouter();

CASE 1:
Send params to url 


const params = new URLSearchParams(searchParams);

if (term) {                                                                               params.append('sort-by', term);                                                       } else {
  params.delete('sort-by');
}
replace(`${pathname}?${params.toString()}`);
---
CASE 2:
Send params to url but allow only one stack
checks the params, clear old ones, and create new ones

const ba = searchParams.toString();                                                     const params = new URLSearchParams(searchParams);

if (ba.length > 0) {
  let a = ba.split('=')
  let b = a[0];
  params.delete(b);
}

if (term) {
  params.append('sort-by', term);
} else {
  params.delete('sort-by');
}
replace(`${pathname}?${params.toString()}`);
---

CASE 3:
send param to url, allow stacking, prevent duplicate, Custom url design
filter by car and stack tech filter upon it
ex: url/?filter=car+tech

const params = new URLSearchParams(searchParams);
  function preventDuplicateFilter(arr) {
    let a = new Set(arr);
    return [...a];
  };
  // get url string for params
  let previousTerm = params.getAll('filter') || [];

  // if we have a previous item we need to merge our new term
  // first we need to delete our old filter and make new merged one
  // // it was quite hard to do this

  // // PLEASE DON'T CHANGE UNLESS YOU KNOW WHAT TO DO !!!

  if (previousTerm.length > 0) {
    // if we have already at least one param in url delete it
    params.delete('filter');
    console.log(previousTerm, "before push new param");
    
    // in this scenario getAll return array contain one string of two values and space
    // we need to elimenate confusion so we re-arrange to make array of x strings 
    let a = previousTerm.join("").split(" ");

    console.log("try to fix before", a);
    // lets now push our new term into an array called 'a' , now we have an array of string params
    a.push(term);

    // any param cannot be used twice so let create duplicate free array and store it in array called 'b'
    let b = preventDuplicateFilter(a);
    console.log("try fixing stage 2", b);

    parms are strings lets rerurn it to a single string with spaces
    let newTerm = b.join(' ');

    // everthing should be ok now lets append to url
    params.append('filter', newTerm);                                                     
} else {
  // if there is no param create new one
  params.append('filter', term);
}

replace(`${pathname}?${params.toString()}`);
---

RECOVER PARAMS FROM URL
---

retrieve params, prevent duplicate, 


const params = new URLSearchParams(searchParams);
const key = searchParams.get('filter');
console.log(key , 'query key home page');

const queryCriteriaList = key && key.split(' ') || [];
console.log(queryCriteriaList, 'query list, value in home page from url');

function preventDuplicateFilter(arr) {
  let a = new Set(arr);
  return [...a];
}                                                                                     
let queryList = preventDuplicateFilter(queryCriteriaList);

// now send queryList down to the table for fetch and filter

// to cleqr all filters
function clearSearch() {
  console.log('clear all filters');
  params.delete('filter');
  replace(`${pathname}?${params.toString()}`);
}

// clear one filter knowing its value and keep other filters if any exist
function clearOneCriteria(id) {
  console.log("clear criteria "+ id)
  let newFilter = params.getAll("filter").join(" ").split(" ").filter( item => item !== id);

  params.delete('filter');
  if (newFilter.length > 0) {
    params.append('filter', newFilter);
  }                                                                                   
  replace(`${pathname}?${params.toString()}`);
}

-------


to make service worker run on android chrome , go to
chrome://serviceworker-internals/
and check the option 
Open DevTools window and pause JavaScript execution on Service Worker startup for debugging.

and go to
chrome://flags/

look for option: 
Insecure origins treated as secure
add this
http://localhost:3000
then enable this option


------------

job details page
// note that we need search bar appear up in everyPage
// this page would look like we expanded the job item in home page and 

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
// 1. introduction section company x is hiring .. ok
// 2. job summary section (position, company, location, working hours, Role Type(job type)) ...ok job description
// 3. about company ... ok job description
// 4. role overview ... ...ok job description
// 5. Key Responsibilities: unordered list text: details ...ok job description
// 6. unordered list (like this nodejs, excel and stuff like this ,app or tech used in job) ... ok job description
// 7. Qualifications: unordered list (like this : ...ok job description
// Proven experience as a Senior Back End Engineer. 
// Strong proficiency in our tech stack. )
// 8. Why Join Us: resons ... ok job description
// 9. h1 Salary and compensation title followed by salary range
// 10. h1 Benefits summarized as unordered list ... ok benefit section
// 11. last how to apply to job box ... ok apply detail
// How to Apply: Please send your resume and a cover letter explaining why you are the perfect fit for this role.
// We look forward to your application! and button
// some warning down
// related job list as in home exactly for now its random

--------

cool dashboard
https://tailwindflex.com/@anonymous/quora-reddit

most styling comes from here
https://pagedone.io/docs/input
