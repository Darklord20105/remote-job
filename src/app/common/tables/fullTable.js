



const data = [
  {name:'Vera carpenter',role:'Admin',createdAt:'Jan 21,2020',status:'active', style: 'bg-green-200'},
  {name:'Blake bowman',role:'Editor',createdAt:'Jan 01, 2020',status:'active', style: 'bg-green-200'},
  {name:'Dana Moore',role:'Editor',createdAt:'Jan 10, 2020',status:'inactive', style: 'bg-red-200'},
  {name:'Alonzo Cox',role:'Admim',createdAt:'Feb 03, 2020',status:'suspended', style: 'bg-orange-200'},
];

function TableRow({data: {name, role, createdAt, status, style }}) {
  return (
    <tr>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	  <div class="flex items-center">
	  <div class="flex-shrink-0 w-10 h-10">
	  <img class="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
	  </div>
	  <div class="ml-3">
	  <p class="text-gray-900 whitespace-no-wrap">{name}</p>
	  </div>
	  </div>
	  </td>
      
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	  <p class="text-gray-900 whitespace-no-wrap">{role}</p>
	  </td>                                                                             <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	  <p class="text-gray-900 whitespace-no-wrap">{createdAt}</p>
	  </td>
	  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	  <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
	  <span aria-hidden class={"absolute inset-0 opacity-50 rounded-full "+style}></span>
	  <span class="relative">{status}</span>
	  </span>       
	  </td>    
	  </tr>
  );
};

export default function FullTable() {
  return (
    <div class="mt-8">                                                                  <h4 class="text-gray-600">Table with pagination</h4>                                 
	  <div class="mt-6">
	  <h2 class="text-xl font-semibold text-gray-700 leading-tight">Users</h2>
	  <div class="mt-3 flex flex-col sm:flex-row">
	  <div class="flex">
	  <div class="relative">  
	  <select class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">                                     <option>5</option>
	  	    <option>10</option>
	  <option>20</option>
	  </select>
	  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"> 
	  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">   
	  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />      
	  </svg>                                                                            </div>      
	  </div>      
	  <div class="relative">   
	  <select class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">   
	  <option>All</option>    
	  <option>Active</option>      
	  <option>Inactive</option>      
	  </select>           
	  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">         
	  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">               
	  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />  
	  </svg>       
	  </div>                                                                            </div>    
	  </div>
    <div class="block relative mt-2 sm:mt-0">     
	  <span class="absolute inset-y-0 left-0 flex items-center pl-2"> 
	  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
	  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.3875.387 a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>    
	  </svg>           
	  </span>         
	  <input placeholder="Search" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />

	  </div>              
	  </div>            
	  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"> 
	  <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">     
	  <table class="min-w-full leading-normal">        
	  <thead>            
	  <tr>      
	  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th> 
	  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th> 
	  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created at</th>   
	  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>

             </tr>          
	  </thead>
	<tbody>      
        
	{data.map((i)=> {
	  return <TableRow data={i} />
	})}

	</tbody>                                                                          </table>              
	  <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">        
	  <span class="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>                     
	  <div class="inline-flex mt-2 xs:mt-0">        
	  <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">Prev</button>     
	  <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">Next</button>        
	  </div>                      
	  </div>                     
	  </div>                   

          </div>
       </div>                                                                             </div>
  )
}
