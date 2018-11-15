import React from 'react'

export default ({ children, ...props }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" {...props}>
      {children}
    </form>
  )
}
