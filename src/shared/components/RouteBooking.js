import React from 'react'

import BookingDetails from '../containers/BookingDetails'
import BookingHistory from '../containers/BookingHistory'

class RouteBooking extends React.Component {

  render() {
    return (
      <div>
        <BookingDetails />
        <BookingHistory />
      </div>
    )
  }

}

export default RouteBooking 
