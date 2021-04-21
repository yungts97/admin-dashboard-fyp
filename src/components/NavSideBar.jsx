import NavSideBarLink from 'components/NavSideBarLink'
import ThemeSwitch from 'components/ThemeSwitch'
import logo from 'assets/icon.png'

import {
  ChartBarIcon,
  BriefcaseIcon,
  HomeIcon
} from '@heroicons/react/solid'
import React from 'react'
import { ReactComponent as AppLogo } from 'svgs/applogo.svg'

export default function NavSideBar () {
  return (
    <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
      <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <img src={logo} className="h-10 w-10" />
          <p className="font-bold text-xl text-gray-500 dark:text-white px-3">
            HealthOnline
          </p>
          <AppLogo className="h-10 w-10" />
        </div>
        <nav className="mt-6">
          <div>
            <NavSideBarLink
              iconSVG={
                <HomeIcon className="h-5 w-5"/>
              }
              linkDescription={'Hello'}
              url={'/hello'}
              />
            <NavSideBarLink
              iconSVG={
                <BriefcaseIcon className="h-5 w-5"/>
              }
              linkDescription={'Projects'}
              url={'/dashboard'}
              />
            <NavSideBarLink
              iconSVG={
                <ChartBarIcon className="h-5 w-5"/>
              }
              linkDescription={'Charts'}
              url={'/charts'}
            />
          </div>
        </nav>
        <ThemeSwitch/>
      </div>
    </div>
  )
}
