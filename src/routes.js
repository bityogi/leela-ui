import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Schedule from './components/Schedule'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/schedule' component={ Schedule } />
          <Route exact path='/cards' component={ Cards } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )