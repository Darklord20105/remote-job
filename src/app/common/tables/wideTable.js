const data = [
  {name:'John Doe',email:'johndoe@gmail.com',title:'Software Enginerr',position:'Web dev',status:'active', style:'bg-green-200', ownership:'Owner'}
]

function TableRow({data: {name, email,title, position, status, ownership}}) {
  return(
    <tr>                                                                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">                  <div class="flex items-center">                                                   <div class="flex-shrink-0 h-10 w-10">                                               <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />                                       </div>
            <div class="ml-4">                                                                <div class="text-sm leading-5 font-medium text-gray-900">{name}</div>            <div class="text-sm leading-5 text-gray-500">{email}</div>
            </div>                                                                            </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">                <div class="text-sm leading-5 text-gray-900">{title}</div>
	    <div class="text-sm leading-5 text-gray-500">{position}</div>                        </td>                                                                             <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{status}</span>                                           </td>                                                                             <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">{ownership}</td>                                                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>            </td>                                                                             </tr>
  )
}

export default function WideTable () {
  return (
  <>
    <div class="mt-8">
        <h4 class="text-gray-600">Wide Table</h4>
        
        <div class="flex flex-col mt-6">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>

                        <tbody class="bg-white">
	  		  {data.map( (i) => {
			    return <TableRow data={i}/>
			  })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
