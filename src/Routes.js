import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NotFound from './containers/NotFound'
import AuthRoute from './components/AuthRoute'

export default ({ childProps }) => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={Home} props={childProps} />
      <AuthRoute exact path="/login" component={Login} props={childProps} />
      <AuthRoute exact path="/signup" component={Signup} props={childProps} />
      <Route component={NotFound} />
    </Switch>
  )
}
