import React from 'react'
import GraphChart from 'components/LineGraphChart'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'

const ChartsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-3 gap-2 md:gap-4 grid-flow-row-dense h-full">
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
