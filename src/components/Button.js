import React from 'react'

export default ({ children, ...props }) => {
  return (
    <button
      className={`
        text-white 
        font-bold 
        py-2 
        px-4 
        rounded 
        focus:outline-none 
        focus:shadow-outline 
        ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${
          props.red
            ? `bg-red 
          hover:bg-red-dark`
            : props.green
            ? `bg-green 
          hover:bg-green-dark`
            : `bg-blue 
            hover:bg-blue-dark`
        }
        `}
      {...props}
    >
      {children}
    </button>
  )
}
