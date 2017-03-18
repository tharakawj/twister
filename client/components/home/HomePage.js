import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TweetsList from '../common/TweetsList';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        {this.props.user ? (
          <TweetsList/>
        ) : (
          <div className="jumbotron">
            <h1>Twister</h1>
            <p>A better way to organize and use twitter lists</p>
            <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(HomePage);