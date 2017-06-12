import React from 'react'
import {Switch} from 'react-router-dom'
import {Route} from 'react-router-dom'
import RouteIndex from './RouteIndex'
import RouteBooking from './RouteBooking'

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={RouteIndex} />
        <Route path='/bookings' component={RouteBooking} />
      </Switch>
    )
  }

}

export default App
