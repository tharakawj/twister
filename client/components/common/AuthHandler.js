import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import Spinner from "./Spinner";
import { ACCESS_TOKEN_KEY } from "../../constants/AppConstants";
import { authUser } from "../../actions/AuthActions";

class AuthHandler extends React.Component {
  static defaultProps = {
    user: null
  };

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired
    }),
    location: PropTypes.shape({ search: PropTypes.string.isRequired })
      .isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({ result: PropTypes.string.isRequired })
        .isRequired
    }).isRequired,
    authUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    const queryParams = queryString.parse(this.props.location.search);
    const token = queryParams.id_token;
    if (this.props.match.params.result === "success" && token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      this.props.authUser(token);
    }
  }

  render() {
    return this.props.user ? <Redirect to="/" /> : <Spinner />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { authUser })(AuthHandler);
