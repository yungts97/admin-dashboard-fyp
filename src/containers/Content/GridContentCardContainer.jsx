import React from 'react'
import PropTypes from 'prop-types'

const GridContentCardContainer = ({ children }) => {
  return (
    <div>
      <div className="shadow-lg rounded-2xl p-2 bg-white dark:bg-gray-700">
        {children}
      </div>
    </div>
  )
}

GridContentCardContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default GridContentCardContainer
