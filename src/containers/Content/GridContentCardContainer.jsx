import React from 'react'
import PropTypes from 'prop-types'

const GridContentCardContainer = ({ children }) => {
  return (
    <div className="shadow-lg rounded-2xl p-2 bg-white dark:bg-gray-700 w-full h-full">
      {children}
    </div>
  )
}

GridContentCardContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default GridContentCardContainer
