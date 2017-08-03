import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TweetsList from "./components/TweetsList";
import ListsList from "./components/ListsList";

const Timeline = props =>
  <div className="row">
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
  </div>;

Timeline.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ listId: PropTypes.string }).isRequired
  }).isRequired
};

export default withRouter(Timeline);
