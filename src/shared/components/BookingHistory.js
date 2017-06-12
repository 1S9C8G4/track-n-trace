import React from 'react'
import Booking from  './Booking.js';
import styles from  '../styles'

class BookingHistory extends React.Component {

  render() {
    return (
      <div className={styles('container')}>
        <table className={styles('u-full-width')}> 
          {this.props.booking.history.length > 0 &&
            <thead>
              <tr>
                <th>Line</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Vessel</th>
                <th>Voyage</th>
                <th>Arrival</th>
                <th>Containers</th>
              </tr>
            </thead>
          }
          <tbody>
            {this.props.booking.history.map(item =>
              <tr>
                <td>{item.line}</td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td>{item.vessel}</td>
                <td>{item.voyage}</td>
                <td>{item.arrival}</td>
                <td>{item.containers}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}

export default BookingHistory 
