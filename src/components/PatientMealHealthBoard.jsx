/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import HttpHelper from 'utilities/HttpHelper'
import { getDateObjFromISOString } from 'utilities/DateTimeHelper'
import { useAuthProvider } from 'providers/AuthProvider'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { BASE_URL } from 'utilities/Constant'

const GRADIENT_BGS = [
  'gradient-bg-1',
  'gradient-bg-2',
  'gradient-bg-3',
  'gradient-bg-4',
  'gradient-bg-5'
]

const PatientMealHealthBoard = ({ title, patientId }) => {
  const [MYDATA, setMYDATA] = useState([])
  const [currentData, setCurrentData] = useState(MYDATA)
  const defaultDtState = {
    num_item_per_page: 5,
    total_item: currentData.length,
    pages: Math.ceil(currentData.length / 5),
    page_limit: 5
  }

  const [currentPageData, setCurrentPageData] = useState(
    currentData.slice(0, defaultDtState.page_limit)
  )
  const [dtState, setDtState] = useState(defaultDtState)
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)
  const [isAccept, setIsAccept] = useState(true)
  const [targetAssignment, setTargetAssignment] = useState()
  const [authState] = useAuthProvider()

  // render the body of list box
  const renderBody = () => {
    if (MYDATA.length === 0) {
      return (
				<div className='inline-block max-w-max rounded-lg overflow-hidden shadow-md mb-2'>
					<div className='flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 w-full h-20 p-4 dark-enabled-text'>
						<ExclamationCircleIcon className='w-8 h-8' />
						<p>Nothing to show.</p>
					</div>
				</div>
      )
    }
    return (
			<>
				{currentPageData.map((row, Indx) => {
				  const dateObj = getDateObjFromISOString(row.date_created)
				  return (
						<div
							key={Indx}
							className='inline-block w-full rounded-lg overflow-hidden shadow-md mb-2 transition duration-300 ease-in-out transform hover:scale-110'>
							<div className='flex items-center bg-gray-100 dark:bg-gray-800 w-full h-20 text-white'>
								<img
									alt='profil'
									src={`${BASE_URL}image/${patientId}/${row.image}`}
									className='h-20 w-20'
								/>
								<div className='px-5 flex flex-col'>
									<p className='text-sm font-medium dark-enabled-text'>{`${dateObj.day} ${dateObj.month} ${dateObj.year}`}</p>
									<p className='text-xs font-thin dark-enabled-text'>{`${dateObj.weekday} | ${dateObj.timeIn12}`}</p>
									<div className='flex flex-wrap overflow-hidden h-8'>
										{row.food_items.map((food, Indx2) => (
											<span
												key={Indx2}
												className={`px-2 py-1 ${GRADIENT_BGS[Indx]} rounded-lg mr-2 mt-1 mb-1 text-xs font-extralight`}>
												{food?.food
												  ? food?.food?.food_name
												  : food.new_food_type}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
				  )
				})}
			</>
    )
  }

  // current data handler
  const currentPageDataHandler = (
    page = 1,
    numItemPerPage = dtState.num_item_per_page,
    currData = currentData
  ) => {
    const startIndex = (page - 1) * numItemPerPage
    const end = startIndex + numItemPerPage
    const dataInPage = currData.slice(startIndex, end)
    setCurrentPageData(dataInPage)
    setCurrentPage(page)
  }

  async function fetchUserMealRecords () {
    let res = await HttpHelper.Get.GetClinicianAssignedUserMealRecords(
      patientId,
      authState.token
    )
    if (res.error) {
      return
    }
    res = res.data
    // if (foodState.length > 0) {
    //  res = res.map((meal) => ({
    //    ...meal,
    //    food_items: meal.food_items.map((food) => ({
    //      ...food,
    //      volume_consumed: parseInt(food.volume_consumed * 100),
    //      food_name: foodState.find((x) => x.food_id === food.food_id)
    //        ?.food_name
    //    }))
    //  }))
    // }
    // setPatientMealRecords(res)
    console.log(res)
    setDtState({
      ...dtState,
      total_item: res.length,
      pages: Math.ceil(res.length / 5)
    })
    setMYDATA(res)
    setCurrentData(res)
    setCurrentPageData(res.slice(0, 5))
  }

  useEffect(() => {
    fetchUserMealRecords()
  }, [])

  return (
		<div className='antialiased font-san'>
			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-4'>
					<div>
						<h2 className='font-bold text-xl leading-tight dark-enabled-text'>
							{title ?? 'Untitled'}
						</h2>
					</div>
					<div className='flex w-auto flex-row mt-5'>
						<button className='gradient-bg-1 px-4 py-2 rounded-lg text-white mr-4'>
							Meal History
						</button>
						<button className='gradient-bg-4 px-4 py-2 rounded-lg text-white'>
							Health History
						</button>
					</div>
					<div className='pt-4 w-80'>{renderBody()}</div>
					<div className='flex xs:mt-0 justify-between items-center w-80'>
						<span className='text-xs xs:text-sm dark-enabled-text'>
							Showing {(currentPage - 1) * dtState.num_item_per_page + 1} to{' '}
							{(currentPage - 1) * dtState.num_item_per_page +
								currentPageData.length}{' '}
							of {dtState.total_item} Entries
						</span>
						<div>
							<button
								className={`text-sm bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200 dark-enabled-text font-semibold py-2 px-4 rounded-l focus:outline-none ${
									currentPage === 1 && 'cursor-not-allowed'
								}`}
								onClick={() => currentPageDataHandler(currentPage - 1)}
								disabled={currentPage === 1}>
								Prev
							</button>
							<button
								className={`text-sm bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200 dark-enabled-text font-semibold py-2 px-4 rounded-r focus:outline-none ${
									currentPage === dtState.pages && 'cursor-not-allowed'
								}`}
								onClick={() => currentPageDataHandler(currentPage + 1)}
								disabled={currentPage === dtState.pages}>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}

PatientMealHealthBoard.propTypes = {
  title: PropTypes.string,
  patientId: PropTypes.string
}

export default PatientMealHealthBoard
