import React from 'react'

export default ({ fileName, ...props }) => {
  return (
    <div className="overflow-hidden relative w-64">
      <button onClick={e => e.preventDefault()} className=" inline-flex items-center bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
        <svg
          fill="#2779bd"
          height="18"
          viewBox="0 0 24 24"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
        </svg>
        <span className="ml-2">Upload File</span>
      </button>
      <input
        className="cursor-pointer absolute block opacity-0 pin-r pin-t"
        type="file"
        {...props}
      />
    </div>
  )
}
