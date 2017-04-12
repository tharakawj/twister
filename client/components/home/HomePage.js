import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TweetsList from '../common/TweetsList';
import ListsList from '../common/ListsList';

export class HomePage extends React.Component {
  render() {
    return (
      <div>
        {this.props.user ? (
          <div className="row">
            <div className="col-md-2">
              <ListsList/>
            </div>
            <div className="col-md-10">
              <TweetsList listId={this.props.params.listId}/>
            </div>
          </div>
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

function mapStateToProps(state, ownParams) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(HomePage);