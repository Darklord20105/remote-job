'use client'
import { useEffect, useRef, useState } from 'react';

export function RichTextEditor({data : {
  id, handleTextEditorOutput, validationError
}}) {
  const editorRef = useRef(null);
  const [content, setContent] = useState('Start typing here...');

  useEffect(() => {
    handleTextEditorOutput(content, id);
  }, [content])
  // console.log(id, handleTextEditorOutput)

  const applyFormat = (command, value = null) => {
    try {
      // Ensure the contentEditable area is focused
      if (editorRef.current) {
        document.execCommand(command, false, value);
      }
    } catch (error) {
      console.error(`Command ${command} failed:`, error);
    }

  };

  const handleCommand = (command, value = null) => {
    applyFormat(command, value);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      setContent(editorRef.current.innerHTML);
    }, 0);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const styleHtmlContent = (html) => {
    if (editorRef.current) {
      const div = document.createElement('div');
      div.innerHTML = html;

      // Apply styles to headings
      div.querySelectorAll('h1').forEach(el => el.classList.add('text-3xl', 'font-bold', 'my-4'));
      div.querySelectorAll('h2').forEach(el => el.classList.add('text-2xl', 'font-semibold', 'my-3'));

      // Apply styles to ordered lists
      div.querySelectorAll('ol').forEach(el => el.classList.add('list-decimal', 'list-inside', 'mb-4'));

      // Apply styles to unordered lists
      div.querySelectorAll('ul').forEach(el => el.classList.add('list-disc', 'list-inside', 'mb-4'));

      return div.innerHTML;
    }
  };

  return (
    <>
    <div className="border rounded-md shadow-sm">
      <div className="flex items-center p-2 bg-gray-100 border-b flex-wrap">
        {/* Undo */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('undo')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
          </svg>
        </button>

        {/* Redo */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('redo')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4" />
          </svg>

        </button>

        {/* Bold */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('bold')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6" />
          </svg>

        </button>

        {/* Italic */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('italic')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18" />
          </svg>

        </button>

        {/* H1 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('formatBlock', 'H1')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" id="heading-1" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color w-6 h-6"><path id="secondary" d="M21,20H17a1,1,0,0,1,0-2h1V10.62l-.55.27a1,1,0,0,1-.9-1.78l2-1A1,1,0,0,1,20,9v9h1a1,1,0,0,1,0,2Z" style={{ fill: "rgb(44, 169, 188)" }}></path><path id="primary" d="M13,20H11a1,1,0,0,1,0-2V13H5v5a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2V6A1,1,0,0,1,3,4H5A1,1,0,0,1,5,6v5h6V6a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2V18a1,1,0,0,1,0,2Z" style={{ fill: "rgb(0, 0, 0)" }}></path></svg>
        </button>

        {/* H2 */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('formatBlock', 'H2')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" id="heading-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 icon flat-color">
            <path id="secondary" d="M21,20H16a1,1,0,0,1-1-1,5.93,5.93,0,0,1,3-5.14l1.26-.72A1.51,1.51,0,0,0,20,11.83V11.5a1.5,1.5,0,0,0-3,0V12a1,1,0,0,1-2,0v-.5a3.5,3.5,0,0,1,7,0v.33a3.51,3.51,0,0,1-1.76,3L19,15.59A4,4,0,0,0,17.13,18H21a1,1,0,0,1,0,2Z" style={{ fill: "rgb(44, 169, 188)" }}></path>
            <path id="primary" d="M12,20H10a1,1,0,0,1,0-2V13H5v5a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2V6A1,1,0,0,1,3,4H5A1,1,0,0,1,5,6v5h5V6a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2V18a1,1,0,0,1,0,2Z" style={{ fill: "rgb(0, 0, 0)" }}></path>
          </svg>
        </button>

        {/* Ordered List */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('insertOrderedList')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4" />
          </svg>

        </button>

        {/* Unordered List */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('insertUnorderedList')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6" />
            <line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <circle cx="4" cy="6" r="1" />
            <circle cx="4" cy="12" r="1" />
            <circle cx="4" cy="18" r="1" />
          </svg>
        </button>

        {/* Text Alignment */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('justifyLeft')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="21" y2="6" />
            <line x1="4" y1="12" x2="17" y2="12" />
            <line x1="4" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('justifyCenter')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="6" x2="18" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="6" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('justifyRight')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="20" y2="12" />
            <line x1="3" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('justifyFull')}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        {/* Insert Link */}
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handleCommand('createLink', prompt('Enter the URL'))}
          className="p-2 mx-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961" />
          </svg>

        </button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 bg-white min-h-[200px] outline-none"
        placeholder="Start typing here..."
        onInput={handleContentChange}
        id={id}
      ></div>
      {/* Preview Area */}
      <div className="border-t p-4 mt-4 bg-gray-50">
        <h3 className="text-lg font-semibold">Preview</h3>
        <div
          className="mt-2 p-4 bg-white border rounded"
          dangerouslySetInnerHTML={{ __html: styleHtmlContent(content) }}
        ></div>
      </div>
      {/* validationError && <span className="text-xs text-red-400 font-normal mt-2 block">
	{validationError.error}</span>*/}
    </div>
    {validationError && <span className="text-xs text-red-400 font-normal mt-2 block">                                         {validationError.error}</span>}
    </>
  );
}
