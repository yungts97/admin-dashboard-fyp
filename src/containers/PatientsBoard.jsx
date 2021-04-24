import React from 'react'
import GridContentCardContainer from 'containers/Content/GridContentCardContainer'
import Datatable from 'components/Datatable'

const PatientsBoard = () => {
  return (
    <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4">
      <div className="col-span-2 md:col-span-2">
        <GridContentCardContainer>
          <Datatable title={'Patients'}/>
        </GridContentCardContainer>
      </div>
      <div className="col-span-1 md:col-span-1">
        <GridContentCardContainer></GridContentCardContainer>
      </div>
    </div>
  )
}

export default PatientsBoard
