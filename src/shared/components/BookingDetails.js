import React from 'react'
import {Link} from 'react-router-dom'
import styles from  '../styles/'

class BookingDetails extends React.Component {

  render() {
    return (
      <div className={styles('container mt10')}>
        <div className={styles('u-full-width')}>
          <div>
            <h1>
              <Link className={styles('no-ul black')} to='/'>←</Link>
              <span className={styles('ml10px')}>
                Booking: {this.props.booking.number}
              </span>
            </h1>
            <p>
              <span className={styles('bold')}>Status</span>:&nbsp;
              {this.props.booking.state}
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default BookingDetails 
