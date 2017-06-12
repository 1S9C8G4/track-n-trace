export default (state, action) => {
  switch(action.type) {
    case '@@redux/INIT':
      return state;
    case 'CREATE':
      return  {
        bookings: [...state.bookings, {
          state: 'Fetching',
          number: action.number
        }]
      }
    case 'DELETE':
      return {
        bookings: state.bookings.reduce((_bookings, booking) => {
          if (booking.number !== action.number) {
            _bookings.push(booking)
          }
          return _bookings
        }, [])
      }
    case 'SHOW':
      return {
        bookings: [...state.bookings],
        booking: action.booking
      }
    case 'SYNC':
      return {
        bookings: state.bookings.reduce((_bookings, booking) => {
          if (booking.number === action.json.number) {
            _bookings.push(action.json)
          } else {
            _bookings.push(booking)
          }
          return _bookings
        }, [])
      }
    case 'WATCH':
      return {
        bookings: state.bookings.reduce((_bookings, booking) => {
          if (booking.number === action.booking.number) {
            booking.watch = !action.booking.watch
          }
          _bookings.push(booking)
          return _bookings
        }, [])
      }
    default:
      return state;
  }
}
