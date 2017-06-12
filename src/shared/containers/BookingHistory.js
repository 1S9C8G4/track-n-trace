import {connect} from 'react-redux'
import BookingHistory from '../components/BookingHistory'

const mapStateToProps = (state, ownProps) => {
	return {
		bookings: state.bookings,
		booking: state.booking
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingHistory)
