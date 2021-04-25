import React from 'react'
import ProtectedRoute from 'router/ProtectedRoute'
import NavSideBar from 'components/NavSideBar'
import Header from 'components/Header'
import Content from 'containers/Content/Content'
import TestDashBoard from 'containers/TestDashBoard'
import ChartsDashboard from 'containers/ChartsDashBoard'
import Hello from 'components/Hello'
import PatientsBoard from 'containers/PatientsBoard'

const CoreContainer = () => {
  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <NavSideBar />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <Header />
            <Content>
              <ProtectedRoute exact path="/home" component={Hello} />
              <ProtectedRoute
                exact
                path="/dashboard"
                component={TestDashBoard}
              />
              <ProtectedRoute
                exact
                path="/charts"
                component={ChartsDashboard}
              />
              <ProtectedRoute
                exact
                path="/patients"
                component={PatientsBoard}
              />
              <ProtectedRoute
                exact
                path="/patients/:id"
                component={Hello}
              />
            </Content>
          </div>
        </div>
      </main>
    </>
  )
}
export default CoreContainer
