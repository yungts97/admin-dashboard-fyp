import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavSideBar from 'components/NavSideBar'
import Header from 'components/Header'
import Content from 'containers/Content/Content'
import TestDashBoard from 'containers/TestDashBoard'
import Hello from 'components/Hello'
import Login from 'pages/Login'
import ChartsDashboard from 'containers/ChartsDashBoard'

export default function Main () {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Router>
          <NavSideBar />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <Header />
            <Content>
              <Switch>
                <Route path="/hello">
                  <Hello />
                </Route>
                <Route path="/dashboard">
                  <TestDashBoard />
                </Route>
                <Route path="/charts">
                  <ChartsDashboard />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </Content>
          </div>
        </Router>
      </div>
    </main>
  )
}
