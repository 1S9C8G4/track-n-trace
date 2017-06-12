import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import styles from  '../styles'

class Booking extends React.Component {

  componentDidMount() {
    this.sync({
      props: this.props,
      dispatch: this.context.store.dispatch
    });
  }

  route(e) {
    this.context.store.dispatch({
      type: 'SHOW',
      booking: this.props
    })
  }

  sync({props, dispatch}) {
    if (props.state === 'Fetching') {
       fetch(`/api/bookings/${props.number}`).then(r => 
        r.json()
      ).then(json => {
        if (json.state !== 'Fetching') {
          dispatch({
            type: 'SYNC',
            json
          })
        } else {
          setTimeout(() => {
            this.sync({
              props, 
              dispatch
            }) 
          }, 1000)
        }
      })
    }
  }

  delete(e) {
    fetch(`/api/bookings/${this.props.number}`, { 
      method: 'DELETE'
    })
    this.context.store.dispatch({
      type: 'DELETE',
      number: this.props.number
    })
  }

  watch(e) {
    fetch(`/api/bookings/${this.props.number}`, {
      method: 'PUT',
      body: JSON.stringify({
        watch: !this.props.watch
      })
    })
    this.context.store.dispatch({
      type: 'WATCH',
      booking: this.props
    })
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.state}
        </td>
        <td>
          {this.props.state === 'Fetching' ? (
            this.props.number
          ) : (
            <Link
              onClick={e => {this.route(e)}}
              to={`/bookings/${this.props.number}`}>
              {this.props.number}
            </Link>
          )}
        </td>
        <td>
          <button 
            onClick={e => {this.delete(e)}}
            className={styles('u-pull-right ml10px')}>
            Delete
          </button>
          <button 
            onClick={e => {this.watch(e)}}
            className={styles('u-pull-right')}>
            {this.props.watch ? 'Stop Watching' : 'Watch'}
          </button>
        </td>
      </tr>
    )
  }

}

Booking.contextTypes = {
  store: PropTypes.object
}

export default Booking 
