import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NotFound from './containers/NotFound'
import NewNote from './containers/NewNote'
import Notes from './containers/Notes'
import AuthRoute from './components/AuthRoute'
import ProtectedRoute from './components/ProtectedRoute'
import UnProtectedRoute from './components/UnProtectedRoute'

export default ({ childProps }) => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Home} props={childProps} />
      <UnProtectedRoute
        path="/login"
        exact
        component={Login}
        props={childProps}
      />
      <UnProtectedRoute
        path="/signup"
        exact
        component={Signup}
        props={childProps}
      />
      <ProtectedRoute
        path="/newNote"
        exact
        component={NewNote}
        props={childProps}
      />
      <ProtectedRoute
        path="/notes/:id"
        exact
        component={Notes}
        props={childProps}
      />

      <Route component={NotFound} />
    </Switch>
  )
}
