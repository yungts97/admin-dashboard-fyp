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
import MealRecord from 'models/MealRecord'
import NutritionModal from 'components/NutritionModal'
import ContentCardContainer from 'containers/Content/ContentCardContainer'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useThemeProvider } from 'providers/ThemeProvider'
import { useAuthProvider } from 'providers/AuthProvider'
import { BarChartDataset, ChartData, LineChartDataset, ChartOptions } from 'models/ChartModels'
import { format } from 'date-fns'
import { CogIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router-dom'
import { FOOD_NUTRITIONS, processNutritionName, defaultSelectedNutrition } from 'utilities/NutritionHelper'

// const myfood = require('data/food.json')
// const myhealth = require('data/health.json')

function processMealRecord (date, mealRecords) {
  let earliestDate = new Date()
  let latestDate
  const array = mealRecords.map(record => {
    const myrecord = new MealRecord(record)
    earliestDate = earliestDate < myrecord.date ? earliestDate : myrecord.date
    latestDate = latestDate > myrecord.date ? latestDate : myrecord.date
    return myrecord
  })
  const dayArray = (new Array(getNumOfDaysInMonth(date)).fill(undefined)).map((item, index) => index + 1)
  const dataArrayPerMonth = new Array(getNumOfDaysInMonth(date)).fill(undefined)
  const monthArray = array.filter(record => record.date.getMonth() === date.getMonth() && record.date.getFullYear() === date.getFullYear())
  monthArray.forEach(record => {
    const day = record.date.getDate() - 1
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
      acc.bloodGlucose = item.bloodGlucose ? (acc.bloodGlucose + item.bloodGlucose) / 2 : acc.bloodGlucose
      acc.foodItems = acc.foodItems.concat(item.foodItems)
      return acc
    })
  })

  return [dayArray, processedData, [earliestDate, latestDate]]
}

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
    const day = record.date.getDate() - 1
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
  const [patientHeight, setPatientHeight] = useState(1)
  const [healthData, setHealthData] = useState([])
  const [mealData, setMealData] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [month, setMonth] = useState(0)
  const [currentMealNutrition, setCurrentMealNutrition] = useState(undefined)
  const [numOfHealthDays, myHealthData, smallestLargestHealthYearHealth] = useMemo(() => processHealthRecord(currentDate, healthData), [month, healthData])
  const [numOfMealDays, myMealData, smallestLargestHealthYearMeal] = useMemo(() => processMealRecord(currentDate, mealData), [month, mealData])

  // @ts-ignore
  const { id } = useParams()
  const [dark] = useThemeProvider()

  const [selectedNutrition] = useState(defaultSelectedNutrition)
  const [foodNutritions, setFoodNutritions] = useState(
    FOOD_NUTRITIONS.map((f) => ({
      ...f,
      selected: selectedNutrition.includes(f.nutrition.nutrition_code)
    }))
  )

  const [visibleDialog, setVisibleDialog] = useState(false)
  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog)
  }

  async function fetchData () {
    try {
      const [profile, health, meals] = await Promise.all([
        HttpHelper.Get.GetClinicianAssignedUserHealthProfile(id, authState.token),
        HttpHelper.Get.GetClinicianAssignedUserHealthRecords(id, authState.token),
        HttpHelper.Get.GetClinicianAssignedUserMealRecords(id, authState.token)
      ])

      // // Testing Only
      // const response = {
      //   data: [myhealth, myfood],
      //   error: false
      // }

      if (!health?.error && !meals?.error) {
        setHealthData(health.data ?? [])
        setMealData(meals.data ?? [])

        // Need to get a patient's height
        setPatientHeight(profile?.height ?? undefined)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getElementAtEvent = element => {
    if (!element.length) return

    const { _index } = element[0]
    const date = new Date(currentDate)
    date.setDate(_index + 1)
    setCurrentDate(date)
  }

  useEffect(() => {
    const lMonth = currentDate.getMonth()
    if (lMonth !== month) {
      setMonth(lMonth)
    }
  }, [currentDate])

  useEffect(() => {
    setCurrentMealNutrition(myMealData[currentDate.getDate() - 1]?.getTotalMealNutrition())
  }, [myMealData, currentDate])

  useEffect(() => {
    // Need to fetch patient data on first load
    fetchData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ContentCardContainer>
        <div className="flex flex-row justify-between items-center">
          <div>
            <span className="mr-1 dark-enabled-text">Record Date: </span>
            <DatePicker
              selected={currentDate}
              onChange={date => setCurrentDate(date)}
              minDate={smallestLargestHealthYearHealth[0] > smallestLargestHealthYearMeal[0]
                ? smallestLargestHealthYearMeal[0]
                : smallestLargestHealthYearHealth[0]
              }
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

      {/* Health Charts only */}
      {healthCharts &&
        <div className="grid gap-3 md:grid-cols-2 auto-row-min">
          <div className="col-span-full h-56">
            <GridContentCardContainer >
              <GraphChart
                data={new ChartData(numOfHealthDays, [
                  new LineChartDataset('Weight (kg)', myHealthData.map(item => item?.weight), '#6366F1'),
                  new BarChartDataset('Waist Circumference (cm)', myHealthData.map(item => item?.waistCircumference), '#ed64a6')
                ])}
                options={new ChartOptions(dark, '', `Day of Month (${format(new Date(currentDate), 'MMM-yyyy')})`, '', false)}
              />
            </GridContentCardContainer>
          </div>
          <div className="h-56">
            <GridContentCardContainer >
              <GraphChart
                data={new ChartData(numOfHealthDays, [new LineChartDataset('Physical Exercise', myHealthData.map(item => item?.physicalMinutes), '#6366F1')])}
                options={new ChartOptions(dark, '', `Day of Month (${format(new Date(currentDate), 'MMM-yyyy')})`, '(Minutes)', false)}
              />
            </GridContentCardContainer>
          </div>
          <div className="h-56">
            <GridContentCardContainer >
              <GraphChart
                data={new ChartData(numOfHealthDays, [new BarChartDataset('BMI', myHealthData.map(item => (item?.weight / ((patientHeight / 100) ** 2))?.toFixed(2) ?? 0), '#6366F1')])}
                options={new ChartOptions(dark, '', `Day of Month (${format(new Date(currentDate), 'MMM-yyyy')})`, '', false)}
              />
            </GridContentCardContainer>
          </div>
        </div>}

      {/* Meal Charts only */}
        {!healthCharts && <div>
          {/* Upper Full Stretch Charts */}
          <div className="grid gap-3 grid-cols-2 md:grid-cols-6 mb-4">
            {/* <div className="col-span-full h-56">
              <GridContentCardContainer >
              <GraphChart
                  data={new ChartData(numOfMealDays, [
                    new BarChartDataset('Blood Glucose (mmol/L)', myMealData.map(item => item?.bloodGlucose ?? 0), '#ed64a6')
                  ])}
                  options={new ChartOptions(dark, '', `Day of Month (${format(new Date(currentDate), 'MMM-yyyy')})`, '', false)}
                  event={getElementAtEvent}
                />
              </GridContentCardContainer>
            </div> */}

            <div className="col-span-full h-56">
              <GridContentCardContainer >
              <GraphChart
                  data={new ChartData(numOfMealDays, [
                    new LineChartDataset('Energy (kcal)', myMealData.map(item => item?.getTotalMealNutrition().find(item => item.name === 'energy')?.value?.toFixed(2)), '#ed64a6'),
                    new LineChartDataset('Water (g)', myMealData.map(item => item?.getTotalMealNutrition().find(item => item.name === 'water')?.value.toFixed(2)), '#6366F1')
                  ])}
                  options={new ChartOptions(dark, '', `Day of Month (${format(new Date(currentDate), 'MMM-yyyy')})`, '', false)}
                  event={getElementAtEvent}
                />
              </GridContentCardContainer>
            </div>
          </div>

          <ContentCardContainer>
            <div className="flex flex-row justify-between items-center">
              <span></span>
              <span className="dark-enabled-text">Daily Nutrition Value for ({format(new Date(currentDate), 'dd-MMM-yyyy')})</span>
              <button className='dark-enabled-text' onClick={toggleDialog}>
                <CogIcon className='h-5 w-5' />
              </button>
            </div>
          </ContentCardContainer>

          {/* Lower Progress Charts */}
          <div className="grid gap-3 grid-cols-2 md:grid-cols-6">
          {/* Map to each nutrition, will return nothing if limit greater than 0 */}
          {foodNutritions.map((nutritionItem, index) => {
            const nutritionValue = ((currentMealNutrition?.find(item => item.name === nutritionItem.nutrition.nutrition_name))?.value ?? 0).toFixed(2)
            return nutritionItem.limit > 0 && nutritionItem.selected
              ? <GridContentCardContainer key={index} >
            <CircularProgressbarWithChildren
              value={nutritionValue}
              maxValue={nutritionItem.limit ?? 0}
              styles={buildStyles({
                pathColor: nutritionValue > nutritionItem.limit && nutritionItem.restricted ? '#DC2626' : nutritionValue > nutritionItem.limit ? '#10B981' : '#6366F1'
              })}
            >
              <span className="dark-enabled-text">{processNutritionName(nutritionItem)}</span>
              <span className="dark-enabled-text">
                {nutritionValue}/{nutritionItem.limit ?? ''}
              </span>
              <span className="dark-enabled-text">{nutritionItem.nutrition.nutrition_measurement_suffix}</span>
            </CircularProgressbarWithChildren>
          </GridContentCardContainer>
              : <></>
          })}
          </div>
        </div>}
      </div>

      <NutritionModal
        show={visibleDialog}
        toggleModal={toggleDialog}
        selectedNutritions={selectedNutrition}
        foodNutritions={foodNutritions}
        setFoodNutritions={setFoodNutritions}
      />
    </div>
  )
}

export default ChartsDashboard
