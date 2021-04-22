import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Transition } from '@headlessui/react'
import ThemeSwitch from 'components/ThemeSwitch'
import {
  LogoutIcon
} from '@heroicons/react/outline'
import { useAuthProvider, AuthProviderDispatchMethodConstants } from 'providers/AuthProvider'

const ProfileAvatar = ({ imageSrc }) => {
  const [, dispatch] = useAuthProvider()

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: AuthProviderDispatchMethodConstants.RESET })
  }

  return (
    <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
      <ThemeSwitch />
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex h-10 w-10  justify-center align-middle rounded-full focus:outline-none">
              <img
                alt="profil"
                src={imageSrc}
                className="object-cover rounded-full h-10 w-10"
              />
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 w-32 mt-2 origin-top-right bg-white dark:bg-gray-700 rounded-md shadow-xl focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${active ? 'text-white bg-purple-400' : 'text-red-600 dark:text-red-400'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none transition-colors duration-100 dark:bg-gray-700`}
                      >
                        <LogoutIcon
                          className="w-5 h-5 mr-2"
                          aria-hidden="true"
                        />
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

ProfileAvatar.propTypes = {
  imageSrc: PropTypes.string
}

export default ProfileAvatar
