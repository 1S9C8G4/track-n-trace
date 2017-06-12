import {connect} from 'react-redux'
import BookingDetails from '../components/BookingDetails'

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
)(BookingDetails)
