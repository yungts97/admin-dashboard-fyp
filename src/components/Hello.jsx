import React from 'react'
import PropTypes from 'prop-types'

export default function Hello ({ name }) {
  return <h1>Hello {name}</h1>
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
}
