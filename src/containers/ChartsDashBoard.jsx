import React from 'react'
import GraphChart from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'

const ChartsDashboard = () => {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
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
    </div>
  )
}

export default ChartsDashboard
