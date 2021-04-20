import React from 'react'
import PropTypes from 'prop-types'

export default function NavSideBarLink ({
  linkDescription = '',
  isActive = false,
  iconSVGPath = undefined,
  url
}) {
  return (
    <a
      className={`w-full font-thin uppercase p-4 my-2 flex items-center transition-colors duration-200 justify-start
      ${isActive
      ? 'text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800'
      : 'text-gray-500 dark:text-gray-200 hover:text-blue-500'}`}
      href={url}
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
    </a>
  )
}

NavSideBarLink.propTypes = {
  linkDescription: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  iconSVGPath: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired
}
