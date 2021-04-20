import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

export default function NavSideBarLink ({
  linkDescription = '',
  iconSVGPath = undefined,
  url
}) {
  const location = useLocation()

  return (
    <Link
      className={`w-full font-thin uppercase p-4 my-2 flex items-center transition-colors duration-200 justify-start
      ${location.pathname === url
      ? 'text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800'
      : 'hover:text-blue-500 text-gray-500 dark:text-gray-200 dark:hover:bg-gray-800'}`}
      to={url}
    >
      <span className="text-left">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 2048 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          {iconSVGPath}
        </svg>
      </span>
      <span className="mx-4 text-sm font-normal">{linkDescription}</span>
    </Link>
  )
}

NavSideBarLink.propTypes = {
  linkDescription: PropTypes.string.isRequired,
  iconSVGPath: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired
}
