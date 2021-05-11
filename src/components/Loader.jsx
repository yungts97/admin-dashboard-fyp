import React from 'react'
import { ReactComponent as Spinner } from 'svgs/spinner.svg'

export default function Loader () {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='flex-col justify-center items-center dark-enabled-text'>
        <Spinner className='h-15 animate-spin' />
        <p className='text-lg'>Loading...</p>
      </div>
    </div>
  )
}
