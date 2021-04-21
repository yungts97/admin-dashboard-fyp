import React, { Fragment, useState } from 'react'
import ProfileAvatar from 'components/ProfileAvatar'
import MyModal from 'components/LogoutModal'
import { ReactComponent as SearchLogo } from 'svgs/search.svg'
import Avatar from 'assets/avatar.png'
import { Popover, Transition } from '@headlessui/react'
import { LogoutIcon } from '@heroicons/react/outline'
import { useAuthProvider, AuthProviderDispatchMethodConstants } from 'providers/AuthProvider'

export default function Header () {
  const [, dispatch] = useAuthProvider()

  const [show, setShow] = useState(false)

  const toggleModal = () => {
    setShow(!show)
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: AuthProviderDispatchMethodConstants.RESET })
  }

  return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-20">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-full">
            <div className="relative flex items-center w-full lg:w-64 h-full group">

              <SearchLogo/>
              <input
                type="text"
                className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                placeholder="Search"
              />

            </div>
          </div>
          {/* <ProfileAvatar imageSrc={Avatar}/> */}
          <Popover className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
              {({ open }) => (
                <>
                  <Popover.Button className="focus:ring-0">
                    <ProfileAvatar imageSrc={Avatar}/>
                  </Popover.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-500"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute w-screen z-10 max-w-max transform top-16 lg:max-w-max "
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-2 bg-white dark:bg-gray-700">
                          <a
                            href="##"
                            className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            onClick={toggleModal}
                          >
                            <span className="flex items-center">
                              <LogoutIcon className="h-6 w-6 text-red-400" />
                              <span className="text-sm font-medium text-red-400 mx-4">
                                Sign Out
                              </span>
                            </span>

                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
        </div>
      </div>
      <MyModal show={show} toggleModal={toggleModal} logout={logout}/>
    </header>
  )
}
