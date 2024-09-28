function Tag() {
  return (
    <div className="rounded-[0.5em] font-bold w-14 h-4 loadingg animate-pulse cursor-pointer border-solid bg-gray-300">
      <h3></h3>
    </div>
  )
}


function RenderTextLogo() {
  return (
    <div className='rounded-full w-20 h-20 animate-pulse bg-gray-300  border'></div>
  )
}

export default function FeedItemSkeleton() {
  return (
    <div className='flex m-2 p-2 text-gray-300 gap-1 rounded-lg border-solid border-slate-500 border' >

      <div className="logo-image flex justify-center items-center sm-hidden" style={{width:'5rem'}}>
        <div className='rounded-full w-20 h-20 animate-pulse bg-gray-300 border'></div>
      </div>

      <div className='details mx-4 w-3/4'>
	<div className="flex flex-col gap-2 text-black animate-pulse">
	  <p className="w-40 h-5 bg-gray-300 rounded-[0.5em]"></p>
	  <p className="w-32 h-5 bg-gray-300 rounded-[0.5em]"></p>
	</div>
        <div className='detail-list flex gap-2 my-2'>
          <Tag />
          <Tag />
          <Tag />
        </div>
      </div>

      <div className='tag-list w-full  flex items-center justify-center gap-4 sm-hidden '>
        <Tag />
	<Tag />
	<Tag />
      </div>
    </div>
  )
}
