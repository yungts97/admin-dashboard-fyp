import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

const ThemeSwitch = () => {
  const THEME = { DARK: true, LIGHT: false }
  const [checked, setChecked] = useState(localStorage.darkTheme === 'true')

  const labelClasses = classNames(
    'block',
    'overflow-hidden',
    'h-6',
    'rounded-full',
    'bg-gray-300',
    'cursor-pointer',
    { 'bg-purple-500': checked }
  )

  const checkboxClasses = classNames(
    'outline-none',
    'focus:outline-none',
    'right-4',
    'duration-200',
    'ease-in',
    'absolute',
    'block',
    'w-6',
    'h-6',
    'rounded-full',
    'bg-white',
    'border-4',
    'appearance-none',
    'cursor-pointer',
    'checked:right-0'
  )

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
    <div className="w-full flex p-4 justify-items-center flex-col">
      <p className="dark:text-gray-200 text-gray-500 font-medium mb-2">Preference</p>
      <div className="flex flex-row w-full justify-between p-2">
        <span className="dark:text-gray-200 text-gray-500 font-normal mr-4">Dark Theme</span>
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="Purple"
            checked={checked}
            onClick={changeTheme}
            className={checkboxClasses}
          />
          <label htmlFor="Purple" className={labelClasses}></label>
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitch
