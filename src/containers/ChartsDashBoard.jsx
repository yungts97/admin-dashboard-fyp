import React, { useEffect, useState, useMemo } from 'react'
import GraphChart, {
  LineChartData,
  LineChartDataset,
  LineChartOptions
} from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'
import HealthRecord from 'models/HealthRecord'
import {
  getNumOfDaysInMonth
} from 'utilities/DateTimeHelper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ContentCardContainer from 'containers/Content/ContentCardContainer'
import { useThemeProvider } from 'providers/ThemeProvider'

// const myfood = require('data/food.json')
const myhealth = require('data/health.json')
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
  const [healthCharts, setHealthCharts] = useState(true)
  const [startDate, setStartDate] = useState(new Date())
  const [month, setMonth] = useState(0)
  const [numOfDays, myHealthData, smallestLargestYear] = useMemo(() => processHealthRecord(startDate, myhealth), [month])
  // @ts-ignore
  const [dark] = useThemeProvider()

  useEffect(() => {
    const lMonth = startDate.getMonth()
    if (lMonth !== month) {
      setMonth(lMonth)
    }
  }, [startDate])

  useEffect(() => {
    // Need to fetch patient data on first load
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ContentCardContainer>
        <div className="flex flex-row justify-between">
          <div>
            <span className="mr-1 dark-enabled-text">Record Date: </span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              minDate={smallestLargestYear[0]}
              dateFormat="dd-MM-yyyy"
              />
          </div>
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
      {healthCharts && <div className="grid gap-3 md:grid-cols-2 auto-row-min">
          <div>
            <GridContentCardContainer >
              <GraphChart
                data={new LineChartData(numOfDays, [new LineChartDataset('Physical Exercise', myHealthData.map(item => item?.physicalMinutes), '#6366F1')])}
                options={new LineChartOptions(dark, '', 'Day of Month', '(Minutes)', false)}
              />
            </GridContentCardContainer>
          </div>
          <div>
            <GridContentCardContainer >
              <GraphChart
                data={new LineChartData(numOfDays, [new LineChartDataset('Waist Circumference', myHealthData.map(item => item?.waistCircumference), '#6366F1')])}
                options={new LineChartOptions(dark, '', 'Day of Month', '(cm)')}
              />
            </GridContentCardContainer>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default ChartsDashboard
