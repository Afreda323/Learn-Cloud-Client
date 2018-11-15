import React from 'react'
import { Link } from 'react-router-dom'

export default ({ header, text, to }) => {
  return (
    <Link to={to} className="no-underline block group hover:bg-blue-lightest p-4 border-b">
      <p className="font-bold text-lg mb-1 text-black group-hover:text-white">
        {header}
      </p>
      <p className="text-grey-darker mb-2 group-hover:text-white">{text}</p>
    </Link>
  )
}
