import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LandingPage from "../common/LandingPage";
import TweetsList from "../common/TweetsList";
import ListsList from "../common/ListsList";

const HomePage = props => (
  <div>
    {props.user
      ? <div className="row">
          <div className="col-md-3">
            {/*  
                This 'id' prop is just to make sure that ListsList re-render when
                the list route changes depite the fact that react-redux
                connect have implemented shouldComponentUpdate
                https://github.com/reactjs/react-redux/issues/507
              */}
            <ListsList id={props.match.params.listId} />
          </div>
          <div className="col-md-8">
            <TweetsList listId={props.match.params.listId} />
          </div>
        </div>
      : <LandingPage />}
  </div>
);

HomePage.defaultProps = {
  user: null,
  match: null
};

HomePage.propTypes = {
  user: PropTypes.shape({ screen_name: PropTypes.string.isRequired }),
  match: PropTypes.shape({
    params: PropTypes.shape({ listId: PropTypes.string }).isRequired
  })
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(HomePage);
