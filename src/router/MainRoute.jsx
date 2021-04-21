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

export default function MainRoute () {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={AuthContainer} />
          <Route exact path={['/home', '/dashboard']} component={CoreContainer} />
          <Route
            path="*"
            render={({ location }) => (
              <Redirect to={{ pathname: '/', state: { from: location } }} />
            )}
          />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
