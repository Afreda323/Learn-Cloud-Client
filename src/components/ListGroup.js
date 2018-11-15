import React from 'react'

export default ({ children }) => {
  return (
    <div className="overflow-hidden bg-white rounded w-full shadow-md mt-4 leading-normal">
      {children}
    </div>
  )
}
