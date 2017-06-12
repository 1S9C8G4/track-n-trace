import {connect} from 'react-redux'
import Bookings from '../components/Bookings'

const mapStateToProps = (state, ownProps) => {
	return {
		bookings: state.bookings
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookings)
