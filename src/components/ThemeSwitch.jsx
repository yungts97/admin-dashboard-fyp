import React, { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import {
  SunIcon,
  MoonIcon
} from '@heroicons/react/solid'

const ThemeSwitch = () => {
  const THEME = { DARK: true, LIGHT: false }
  const [checked, setChecked] = useState(localStorage.darkTheme === 'true')

  const changeTheme = () => {
    setChecked(!checked)
    localStorage.darkTheme = !checked
    switch (!checked) {
      case THEME.DARK:
        document.documentElement.classList.add('dark')
        break
      case THEME.LIGHT:
        document.documentElement.classList.remove('dark')
        break
    }
  }

  useEffect(() => {
    switch (checked) {
      case THEME.DARK:
        document.documentElement.classList.add('dark')
        break
      case THEME.LIGHT:
        document.documentElement.classList.remove('dark')
        break
    }
  }, [])

  return (
    <>
      <div className="flex flex-row p-2">
        {checked ? <SunIcon className="h-5 w-5 mr-1 text-yellow-500"/> : <MoonIcon className="h-5 w-5 mr-1 text-gray-400"/>}
        <div className="mr-1">
          <Switch
            checked={checked}
            onChange={changeTheme}
            className={`${checked ? 'bg-indigo-500' : 'bg-gray-200'
              } relative inline-flex items-center h-4 rounded-full w-8 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              className={`${checked ? 'translate-x-4' : 'translate-x-0'
                } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default ThemeSwitch
