import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import ProtectedRoute from './components/ProtectedRoute'
import UnProtectedRoute from './components/UnProtectedRoute'

const Home = lazy(() => import('./containers/Home'))
const Login = lazy(() => import('./containers/Login'))
const Signup = lazy(() => import('./containers/Signup'))
const NotFound = lazy(() => import('./containers/NotFound'))
const NewNote = lazy(() => import('./containers/NewNote'))
const Notes = lazy(() => import('./containers/Notes'))
const Settings = lazy(() => import('./containers/Settings'))

export default ({ childProps }) => {
  return (
    <Suspense fallback={'Loading...'}>
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
        <ProtectedRoute
          path="/settings"
          exact
          component={Settings}
          props={childProps}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}
