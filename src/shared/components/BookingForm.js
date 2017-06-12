import React from 'react'
import {connect} from 'react-redux'
import fetch from 'isomorphic-fetch'
import styles from '../styles'

class BookingForm extends React.Component {

  submit(e) {
    e.preventDefault()
    const number = this.input.value.trim()
    if (number) {
      this.input.value = ''
      this.props.dispatch({
        number, type: 'CREATE'
      })  
      fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({number})
      })
    }
  }

  render() {
    return (
       <div className={styles('container mt10')}>
        <div className={styles('row')}>
           <div className={styles('one-half column')}>
             <h2>
               <a href='/' className={styles('no-ul black')}>
                Track'n Trace
              </a>
            </h2>
            <form onSubmit={e => {this.submit(e)}}>
              <label>
                Booking Number
              </label>
              <input
                 type='text'
                ref={node => {this.input = node}}
                className={styles('u-full-width')}
                 placeholder='Example: PABVTXG790214500'/>
               <button className={styles('button-primary')}>
                Submit
              </button>
           </form>
         </div>
       </div>
     </div>
    )
  }
}

export default connect()(BookingForm)
