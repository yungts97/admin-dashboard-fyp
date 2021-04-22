import React from 'react'
import ProfileAvatar from 'components/ProfileAvatar'
import ThemeSwitch from 'components/ThemeSwitch'
import { ReactComponent as SearchLogo } from 'svgs/search.svg'
import avatar from 'assets/avatar.png'

export default function Header () {
  return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-20">
    <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
      <div className="relative pl-1 flex flex-row w-full justify-between sm:pr-2 sm:ml-0">
        <div className="container relative left-0 z-50 flex w-2/3 lg:w-64 h-full">
          <div className="relative flex items-center w-full h-full group">

            <SearchLogo/>
            <input
              type="text"
              className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
              placeholder="Search"
            />

          </div>
        </div>
        <div className="container relative flex flex-row w-1/4 h-full items-center justify-end">
          <ThemeSwitch />
          <ProfileAvatar imageSrc={avatar}/>
        </div>
      </div>
    </div>
  </header>
  )
}
