import React from 'react';
import { connect } from 'react-redux';
import LandingPage from '../common/LandingPage';
import TweetsList from '../common/TweetsList';
import ListsList from '../common/ListsList';

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="row">
            <div className="col-md-3">
              <ListsList/>
            </div>
            <div className="col-md-8">
              <TweetsList listId={this.props.params.listId}/>
            </div>
          </div>
        ) : ( <LandingPage/>) }
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