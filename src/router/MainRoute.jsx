import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import CoreContainer from 'containers/CoreContainer'
import AuthContainer from 'containers/AuthContainer'
import { AuthProvider } from 'providers/AuthProvider'
import { ThemeProvider } from 'providers/ThemeProvider'
import { AssignmentProvider } from 'providers/AssignmentProvider'

export default function MainRoute () {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AssignmentProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={AuthContainer} />
              <Route
                exact
                path={['/home', '/dashboard', '/charts', '/charts/:id', '/patients', '/patients/:id']}
                component={CoreContainer}
              />
              <Route
                path="*"
                render={({ location }) => (
                  <Redirect to={{ pathname: '/', state: { from: location } }} />
                )}
              />
            </Switch>
          </Router>
        </AssignmentProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
