import { useEffect, useState } from "react"
import { PlusSvg, FileSvg, FolderOpenSvg, CloseMiniSvg } from '../svg'

export function UploadImg({data : 
  { id, handleUploadLogo, helperText, setLoadFile }
}) {
	const [file, setFile] = useState({});
	useEffect(() => {
		handleUploadLogo(file, id)
	}, [file])
	function handleChange(e) {
		setFile(URL.createObjectURL(e.target.files[0]) );
		setLoadFile( e.target.files[0] )
	}

	return (
		<div className="w-full grid gap-5">
			<div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 border-dashed">
				<div className="grid gap-3">
					<FileSvg />
					<div className="grid gap-1">
						<h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag an image here</h4>
						<span className="text-center  text-gray-400 text-xs font-light leading-4">OR</span>
						<div className="flex items-center justify-center">
							<label>
								<input onChange={handleChange} type="file" hidden />
								<div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
							</label>
						</div>
					</div>
				</div>
			</div>
		       {helperText && <span className="text-xs text-gray-400 font-normal mt-2 block">{helperText}</span>}
		</div>
	)
}

