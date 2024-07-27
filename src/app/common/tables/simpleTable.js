
const data = [
  {title:'New Yorl', number:'200,120'},
  {title:'Manchester', number:'632,310'},
  {title:'London', number:'451,110'},
  {title:'Madrid', number:'132.524'},
];

function TableRow({data: {title, number}}) {
  return(
    <tr class="hover:bg-gray-200">
        <td class="py-4 px-6 border-b text-gray-700 text-lg">{title}</td>
        <td class="py-4 px-6 border-b text-gray-500">{number}</td>
    </tr>
  )
};

export default function SimpleTable() {
  return(
    <div class="mt-4">                                                                                            <h4 class="text-gray-600">Simple Table</h4>                                                                                                                                                                         <div class="mt-6">                                                                                            <div class="bg-white shadow rounded-md overflow-hidden my-6">
	      <table class="text-left w-full border-collapse">                                                              <thead class="border-b">                                                                                      <tr>                                                                                                         <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">City</th>                                                                                                                           <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Total orders</th>                                                                                                               </tr>                                                                                                 </thead>                                                                                                  <tbody>                                                                                                     {data.map((i) => {
	    		return <TableRow data={i} />
    		      })}
	            </tbody>                                                                                              </table>                                                                                              </div>                                                                                                </div>                                                                                                </div>
  )
};
