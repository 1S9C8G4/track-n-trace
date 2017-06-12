import React from 'react'

import BookingForm from '../containers/BookingForm'
import Bookings from '../containers/Bookings'

class RouteIndex extends React.Component { 

  render() {
    return (
      <div>
        <BookingForm />
        <Bookings />
      </div>
    )
  }

}

export default RouteIndex 
