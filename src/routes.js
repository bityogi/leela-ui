import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from 'components/Dashboard'
import Event from 'components/Event'
import Cards from 'components/Cards'
import Main from 'components/Main'
import Signup from 'components/Signup'
import ScrollToTop from 'components/ScrollTop'

export default props => (
    <ScrollToTop>
      <Switch>
        <Route exact path='/' component={ Main } />
        <Route exact path='/dashboard' component={ Dashboard } />
        <Route exact path='/signup' component={ Signup } />
        <Route exact path='/events' component={ Event } />
        <Route exact path='/cards' component={ Cards } />
      </Switch>
    </ScrollToTop>
  )