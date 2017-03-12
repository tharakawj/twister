import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { ACCESS_TOKEN_KEY } from '../../constants/AppConstants';
import { authUser } from '../../actions/AuthActions';

class AuthHandler extends React.Component {

  componentDidMount() {
    let token = this.props.location.query.id_token;
    if(this.props.params.result === 'success' && token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      this.props.authUser(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div>
        Authenticating user...
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ authUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);