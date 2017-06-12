import React from 'react'
import Booking from  './Booking.js';
import styles from  '../styles'

class Bookings extends React.Component {

  render() {
    return (
      <div className={styles('container')}>
        <table className={styles('u-full-width')}>
          {this.props.bookings.length > 0 &&
            <thead>
              <tr>
                <th>State</th>
                <th>Number</th>
                <th></th>
              </tr>
            </thead>
          }
          <tbody>
            {this.props.bookings.map(booking =>
              <Booking key={booking.number} {...booking} />
            )}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Bookings 
