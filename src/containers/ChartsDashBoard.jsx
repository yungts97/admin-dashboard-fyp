import React, { useEffect, useState, useMemo } from 'react'
import GraphChart from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'
import HealthRecord from 'models/HealthRecord'
import {
  getNumOfDaysInMonth
} from 'utilities/DateTimeHelper'
import HttpHelper from 'utilities/HttpHelper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ContentCardContainer from 'containers/Content/ContentCardContainer'
import { useThemeProvider } from 'providers/ThemeProvider'
import { useAuthProvider } from 'providers/AuthProvider'
import { BarChartDataset, ChartData, LineChartDataset, ChartOptions } from 'models/ChartModels'

const myfood = require('data/food.json')
const myhealth = require('data/health.json')

function processHealthRecord (date, healthRecords) {
  let earliestDate = new Date()
  let latestDate
  const array = healthRecords.map(record => {
    const myrecord = new HealthRecord(record)
    earliestDate = earliestDate < myrecord.date ? earliestDate : myrecord.date
    latestDate = latestDate > myrecord.date ? latestDate : myrecord.date
    return myrecord
  })
  const dayArray = (new Array(getNumOfDaysInMonth(date)).fill(undefined)).map((item, index) => index + 1)
  const dataArrayPerMonth = new Array(getNumOfDaysInMonth(date)).fill(undefined)
  const monthArray = array.filter(record => record.date.getMonth() === date.getMonth() && record.date.getFullYear() === date.getFullYear())
  monthArray.forEach(record => {
    const day = record.date.getDate()
    // if item is undefined place an empty array
    dataArrayPerMonth[day] = dataArrayPerMonth[day] ?? []
    dataArrayPerMonth[day].push(record)
  })

  const processedData = dataArrayPerMonth.map(day => {
    // Only if item is undefined
    if (!day) {
      return undefined
    }

    if (day.length === 1) {
      return day[0]
    }

    return day.reduce((acc, item) => {
      acc.physicalMinutes += item.physicalMinutes
      acc.waistCircumference = (acc.waistCircumference + item.waistCircumference) / 2
      acc.weight = (acc.weight + item.weight) / 2
      return acc
    })
  })

  return [dayArray, processedData, [earliestDate, latestDate]]
}

// Main Page Component
const ChartsDashboard = () => {
  // display healthcharts if true, else mealcharts
  const [authState] = useAuthProvider()
  const [healthCharts, setHealthCharts] = useState(true)
  const [healthData, setHealthData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [month, setMonth] = useState(0)
  const [numOfDays, myHealthData, smallestLargestYear] = useMemo(() => processHealthRecord(startDate, healthData), [month, healthData])
  // @ts-ignore
  const [dark] = useThemeProvider()

  async function fetchData () {
    const userId = 0
    try {
      // const response = await HttpHelper.Get.GetClinicianAssignedUserHealthRecords(userId, authState.token)
      // const response = await HttpHelper.Get.GetClinicianAssignedUserMealRecordsHttpRequestConfig(userId, authState.token)
      const response = {
        data: healthCharts ? myhealth : myfood,
        error: false
      }

      if (!response?.error) {
        console.log('Setting Data')
        setHealthData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const lMonth = startDate.getMonth()
    if (lMonth !== month) {
      setMonth(lMonth)
    }
  }, [startDate])

  useEffect(() => {
    // Need to fetch patient data on first load
    fetchData()
  }, [healthCharts])

  return (
    <div className="flex flex-col min-h-screen">
      <ContentCardContainer>
        <div className="flex flex-row justify-between items-center">
          <div>
            <span className="mr-1 dark-enabled-text">Record Date: </span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              minDate={smallestLargestYear[0]}
              dateFormat="dd-MM-yyyy"
              />
          </div>

          {/* Button components */}
          <div>
            <button
              onClick={() => setHealthCharts(true)}
              className={`${healthCharts ? 'bg-indigo-700' : 'bg-indigo-500'} hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded`}>Health</button>
            <button
              onClick={() => setHealthCharts(false)}
              className={`${!healthCharts ? 'bg-indigo-700' : 'bg-indigo-500'} hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2`}>Meals</button>
          </div>
        </div>
      </ContentCardContainer>
      {/* Grid Components */}
      <div className="flex-grow">
      {healthCharts &&
        <div className="grid gap-3 md:grid-cols-2 auto-row-min">
          <div className="col-span-full h-56">
            <GridContentCardContainer >
              <GraphChart
                data={new ChartData(numOfDays, [
                  new LineChartDataset('Weight (kg)', myHealthData.map(item => item?.weight), '#6366F1'),
                  new BarChartDataset('Waist Circumference (cm)', myHealthData.map(item => item?.waistCircumference), '#ed64a6')
                ])}
                options={new ChartOptions(dark, '', 'Day of Month', '', false)}
              />
            </GridContentCardContainer>
          </div>
          <div className="h-56">
            <GridContentCardContainer >
              <GraphChart
                data={new ChartData(numOfDays, [new LineChartDataset('Physical Exercise', myHealthData.map(item => item?.physicalMinutes), '#6366F1')])}
                options={new ChartOptions(dark, '', 'Day of Month', '(Minutes)', false)}
              />
            </GridContentCardContainer>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default ChartsDashboard
