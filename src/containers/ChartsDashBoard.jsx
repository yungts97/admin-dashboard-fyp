import React, { useEffect } from 'react'
import GraphChart from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'
import MealRecord from 'models/MealRecord'
const myfood = require('data/food.json')
// const myhealth = require('data/health.json')

const ChartsDashboard = () => {
  useEffect(() => {
    const array = myfood.map(record => new MealRecord(record))
    console.log(array[0].getTotalMealNutrition())
  }, [])

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-auto gap-4">
      <div className="col-span-1 md:col-span-2">
        <GridContentCardContainer>
          <GraphChart />
        </GridContentCardContainer>
      </div>

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

      <GridContentCardContainer >
        <GraphChart />
      </GridContentCardContainer>

      <GridContentCardContainer >
        <GraphChart />
      </GridContentCardContainer>
    </div>
  )
}

export default ChartsDashboard
