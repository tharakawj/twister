import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LandingPage from "./scenes/LandingPage";
import Timeline from "./scenes/Timeline";

const Home = props =>
  <div>
    {props.user ? <Timeline /> : <LandingPage />}
  </div>;

Home.defaultProps = {
  user: null
};

Home.propTypes = {
  user: PropTypes.shape({ screen_name: PropTypes.string.isRequired })
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export { Home };

export default connect(mapStateToProps)(Home);
