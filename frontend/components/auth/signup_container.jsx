import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Signup from './signup';

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
    };
};

export default connect(null, mapDispatchToProps)(Signup);
