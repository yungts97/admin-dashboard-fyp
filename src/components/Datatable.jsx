import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ListBoxSelector from 'components/ListBoxSelector'
import { ReactComponent as SearchLogo } from 'svgs/search.svg'
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/solid'
// import avatar from 'assets/avatar.png'

const Datatable = ({ title, data }) => {
  const defaultData = [
    { user: 'William1', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam2', type: 'User', date: '2021-05-21', status: 'active' },
    { user: 'William3', type: 'Admin', date: '2021-07-21', status: 'active' },
    { user: 'William3', type: 'Admin', date: '2021-07-21', status: 'active' },
    { user: 'William3', type: 'Admin', date: '2021-07-21', status: 'active' },
    { user: 'Milliam4', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William5', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam6', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William7', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam8', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William9', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam10', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Milliam6', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William7', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam8', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William9', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam10', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Milliam6', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William7', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam8', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'William9', type: 'Admin', date: '2021-03-21', status: 'active' },
    { user: 'Milliam10', type: 'User', date: '2021-05-21', status: 'inactive' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' },
    { user: 'Dilliam11', type: 'Staff', date: '2020-03-18', status: 'k' }
  ]
  const NUM_ITEMS_PER_PAGE = [5, 10, 20]
  const columns = data ? Object.keys(data[0]) : Object.keys(defaultData[0])
  const MYDATA = data || defaultData
  const [currentData, setCurrentData] = useState(MYDATA)
  const defaultDtState = {
    num_item_per_page: NUM_ITEMS_PER_PAGE[0],
    total_item: currentData.length,
    pages: Math.ceil(currentData.length / NUM_ITEMS_PER_PAGE[0]),
    page_limit: 5
  }

  const [currentPageData, setCurrentPageData] = useState(
    currentData.slice(0, NUM_ITEMS_PER_PAGE[0])
  )
  const [dtState, setDtState] = useState(defaultDtState)
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState({
    orderByAsc: true,
    targetHeaderIndex: null
  })

  // number items per page handler
  const numItemPerPageHandler = (val) => {
    const pages = Math.ceil(currentData.length / val)
    setDtState({
      ...dtState,
      num_item_per_page: val,
      pages: pages
    })
    currentPageDataHandler(undefined, val, undefined)
  }

  // query handler
  const search = (val) => {
    setQuery(val)
    const filteredData = MYDATA.filter((row) =>
      columns.some(
        (col) =>
          row[col].toString().toLowerCase().indexOf(val.toLowerCase()) > -1
      )
    )
    if (val === '') {
      setCurrentData(MYDATA)
      setDtState({
        ...dtState,
        total_item: MYDATA.length,
        pages: Math.ceil(MYDATA.length / dtState.num_item_per_page)
      })
      currentPageDataHandler(undefined, undefined, MYDATA)
    } else {
      setCurrentData(filteredData)
      setDtState({
        ...dtState,
        total_item: filteredData.length,
        pages: Math.ceil(filteredData.length / dtState.num_item_per_page)
      })
      currentPageDataHandler(undefined, undefined, filteredData)
    }
  }

  const handleOrder = (headerIndex) => {
    const targetCol = columns[headerIndex]
    const copiedCurrentData = [...currentData]
    let orderByAsc = false

    // to check if prev target col is same with current col or not
    // if not, set it as to descending order because all initial order is ascending
    // if yes, set it opposite value of the current order
    if (headerIndex !== order.targetHeaderIndex) {
      orderByAsc = false
      setOrder({ orderByAsc: orderByAsc, targetHeaderIndex: headerIndex })
    } else {
      orderByAsc = !order.orderByAsc
      setOrder({ ...order, orderByAsc: orderByAsc })
    }

    // perform arrangement of array of object
    if (orderByAsc) {
      // ascending order
      copiedCurrentData.sort((a, b) =>
        a[targetCol] > b[targetCol] ? 1 : b[targetCol] > a[targetCol] ? -1 : 0
      )
    } else {
      // descending order
      copiedCurrentData.sort((a, b) =>
        a[targetCol] < b[targetCol] ? 1 : b[targetCol] < a[targetCol] ? -1 : 0
      )
    }
    currentPageDataHandler(undefined, undefined, copiedCurrentData)
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

  const renderPages = () => {
    let arr = [...Array(dtState.pages).keys()] // generate array of number (0,1,2 .....)
    arr = arr.map((i) => i + 1) // remake it to (1,2 ,3 ,4 ,5)

    if (!(dtState.pages <= dtState.page_limit)) {
      if (currentPage - 2 > 0 && currentPage + 2 < dtState.pages) {
        // if current page within the range of middle (forword 2 or backward 2 not out of bound)
        const start = currentPage - 3
        const end = start + dtState.page_limit
        arr = arr.slice(start, end)
      } else {
        let start = 0
        let end = 0
        if (currentPage - 2 < 1) {
          // if current page backward 2 out of bound
          start = 0
          end = start + dtState.page_limit
        } else {
          // if current page forward 2 out of bound
          end = dtState.pages
          start = end - dtState.page_limit
        }
        arr = arr.slice(start, end)
      }
    }

    return arr.map((a) => (
      <button
        key={a}
        type="button"
        className={`w-full px-4 py-2 border text-base focus:ring-0 focus:outline-none ${
          currentPage === a
            ? 'bg-indigo-500 text-gray-100 hover:bg-indigo-400 border-indigo-500'
            : 'bg-gray-100 text-indigo-500 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-800 border-gray-100'
        }`}
        onClick={() => currentPageDataHandler(a)}
      >
        {a}
      </button>
    ))
  }

  return (
    <body className="antialiased font-san">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          <div>
            <h2 className="font-bold text-xl leading-tight dark-enabled-text">
              {title ?? 'Untitled'}
            </h2>
          </div>
          <div className="flex w-full flex-row mt-5">
            <ListBoxSelector
              onChange={numItemPerPageHandler}
              data={NUM_ITEMS_PER_PAGE}
              selected={dtState.num_item_per_page}
            />
            <div className="relative flex items-center w-full lg:w-64 h-full group mx-5">
              <SearchLogo />
              <input
                type="text"
                className="block w-full py-1.5 pl-10 pr-6 leading-normal rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                placeholder="Search"
                value={query}
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal border-transparent border-none ">
                <thead className="border-none">
                  <tr>
                    <th className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      #
                    </th>
                    {columns.map((col, Indx) => (
                      <th
                        key={Indx}
                        className="px-3 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        <div className="flex">
                          <span>{col}</span>
                          <button
                            className="ml-5 focus:outline-none"
                            onClick={() => handleOrder(Indx)}
                          >
                            {order.targetHeaderIndex === Indx
                              ? (
                                  order.orderByAsc
                                    ? (
                                <SortAscendingIcon
                                  className="w-5 h-5 dark:hover:text-white hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                      )
                                    : (
                                <SortDescendingIcon
                                  className="w-5 h-5 dark:hover:text-white hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                      )
                                )
                              : (
                              <SortAscendingIcon
                                className="w-5 h-5 dark:hover:text-white hover:text-gray-500"
                                aria-hidden="true"
                              />
                                )}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((row, Indx) => (
                    <tr key={Indx}>
                      <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:border-gray-800">
                        <p className="dark-enabled-text whitespace-no-wrap">
                          {(currentPage - 1) * dtState.num_item_per_page +
                            1 +
                            Indx}
                        </p>
                      </td>
                      {columns.map((col, Indx2) => (
                        <td
                          key={Indx2}
                          className="px-3 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-700 dark:border-gray-800"
                        >
                          <p className="dark-enabled-text whitespace-no-wrap">
                            {row[col]}
                          </p>
                        </td>
                      ))}
                      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={avatar}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {row.user}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.type}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.date}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{row.status}</span>
                        </span>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between dark:bg-gray-700 dark:border-gray-700">
                <span className="text-xs xs:text-sm dark-enabled-text">
                  Showing {(currentPage - 1) * dtState.num_item_per_page + 1} to{' '}
                  {(currentPage - 1) * dtState.num_item_per_page +
                    currentPageData.length}{' '}
                  of {dtState.total_item} Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className={`text-sm bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200 dark-enabled-text font-semibold py-2 px-4 rounded-l focus:outline-none ${
                      currentPage === 1 && 'cursor-not-allowed'
                    }`}
                    onClick={() => currentPageDataHandler(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {renderPages()}
                  <button
                    className={`text-sm bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 hover:bg-gray-200 dark-enabled-text font-semibold py-2 px-4 rounded-r focus:outline-none ${
                      currentPage === dtState.pages && 'cursor-not-allowed'
                    }`}
                    onClick={() => currentPageDataHandler(currentPage + 1)}
                    disabled={currentPage === dtState.pages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
Datatable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object
}

export default Datatable
