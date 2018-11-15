import React from 'react'

export default ({ children, ...props }) => {
  return (
    <label className="block text-grey-darker text-sm font-bold mb-2" {...props}>
      {children}
    </label>
  )
}
