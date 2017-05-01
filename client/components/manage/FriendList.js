import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchFriends } from "../../actions/TweetsActions";

import Friend from "./Friend";

class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchFriends());
  }

  render() {
    const { friends } = this.props;
    if (friends) {
      return (
        <div className="friends-list">
          <ul>
            {friends.map(friend => (
              <Friend key={friend.id_str} friend={friend} />
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>Loading friends...</p>;
    }
  }
}

function mapStateToProps(state, ownParmas) {
  return {
    friends: state.tweets.friends
  };
}

export default connect(mapStateToProps)(FriendList);
