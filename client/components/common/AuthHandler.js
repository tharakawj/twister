import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import Spinner from './Spinner';
import { ACCESS_TOKEN_KEY } from '../../constants/AppConstants';
import { authUser } from '../../actions/AuthActions';

class AuthHandler extends React.Component {

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    let token = queryParams.id_token;
    if(this.props.match.params.result === 'success' && token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      this.props.authUser(token);
    }
  }

  render() {
    return this.props.user ? (<Redirect to="/" />) : (<Spinner/>);
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