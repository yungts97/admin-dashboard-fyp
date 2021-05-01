import React, { useEffect, useState } from 'react'
import GraphChart, {
  LineChartData,
  LineChartDataset
} from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'
import HealthRecord from 'models/HealthRecord'
import {
  getNumOfDaysInMonth
} from 'utilities/DateTimeHelper'
// const myfood = require('data/food.json')
const myhealth = require('data/health.json')
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function processHealthRecord (date, healthRecords) {
  let earliestDate = new Date()
  let latestDate = earliestDate
  const array = healthRecords.map(record => {
    const myrecord = new HealthRecord(record)
    earliestDate = earliestDate < myrecord.date ? earliestDate : myrecord.date
    latestDate = latestDate > myrecord.date ? latestDate : myrecord.date
    return myrecord
  })
  const dayArray = (new Array(getNumOfDaysInMonth(date)).fill(undefined)).map((item, index) => index + 1)
  const dataArrayPerMonth = new Array(getNumOfDaysInMonth(date)).fill(undefined)
  const monthArray = array.filter(record => record.date.getMonth() === date.getMonth())
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
  const [numberOfDays, setNumberOfDays] = useState([])
  const [healthData, setHealthData] = useState([])

  useEffect(() => {
    // const array = myfood.map(record => new MealRecord(record))
    const date = new Date('2020-10-10')
    const [numOfDays, healthData, smallestLargestYear] = processHealthRecord(date, myhealth)
    setNumberOfDays(numOfDays)
    setHealthData(healthData)
    console.log(smallestLargestYear)
    console.log(healthData)
  }, [])

  return (
    <div className="flex flex-col items-center">

      {/* Grid Components */}
      <div className="grid md:grid-cols-2 md:grid-rows-auto gap-4 w-full">
        <div className="col-span-1 md:col-span-2">
          <GridContentCardContainer>
            <GraphChart />
          </GridContentCardContainer>
        </div>
        <GridContentCardContainer >
          <GraphChart data={new LineChartData(numberOfDays, [new LineChartDataset('Physical', healthData.map(item => item?.physicalMinutes), '#6366F1')])}/>
        </GridContentCardContainer>

        <GridContentCardContainer >
          <GraphChart data={new LineChartData(numberOfDays, [new LineChartDataset('Waist', healthData.map(item => item?.waistCircumference), '#6366F1')])}/>
        </GridContentCardContainer>

        <GridContentCardContainer >
          <GraphChart />
        </GridContentCardContainer>

        <GridContentCardContainer >
          <GraphChart />
        </GridContentCardContainer>

        <GridContentCardContainer >
          <GraphChart />
        </GridContentCardContainer>

        <GridContentCardContainer >
          <GraphChart />
        </GridContentCardContainer>
      </div>
    </div>
  )
}

export default ChartsDashboard
