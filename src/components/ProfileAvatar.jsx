import React from 'react'
import PropTypes from 'prop-types'

const ProfileAvatar = ({ imageSrc }) => {
  return (
    <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
      <a href="#" className="block relative">
        <img
          alt="profil"
          src={imageSrc}
          className="mx-auto object-cover rounded-full h-10 w-10 "
        />
      </a>
    </div>
  )
}

ProfileAvatar.propTypes = {
  imageSrc: PropTypes.string
}

export default ProfileAvatar
