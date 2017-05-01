import React from "react";
import { connect } from "react-redux";

import LandingPage from "../common/LandingPage";
import TweetsList from "../common/TweetsList";
import ListsList from "../common/ListsList";

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        {this.props.user
          ? <div className="row">
              <div className="col-md-3">
                {/*  
                This 'id' prop is just to make sure that ListsList re-render when
                the list route changes depite the fact that react-redux
                connect have implemented shouldComponentUpdate
                https://github.com/reactjs/react-redux/issues/507
              */}
                <ListsList id={this.props.match.params.listId} />
              </div>
              <div className="col-md-8">
                <TweetsList listId={this.props.match.params.listId} />
              </div>
            </div>
          : <LandingPage />}
      </div>
    );
  }
}

function mapStateToProps(state, ownParams) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(HomePage);
