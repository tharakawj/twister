import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchFriends } from "../../actions/TweetsActions";

import Friend from "./Friend";

class FriendList extends Component {
  static defaultProps = {
    friends: null
  };

  static propTypes = {
    friends: PropTypes.arrayOf(
      PropTypes.shape({ id_str: PropTypes.string.isRequired })
    ),
    fetchFriends: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFriends();
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
    }
    return <p>Loading friends...</p>;
  }
}

function mapStateToProps(state) {
  return {
    friends: state.tweets.friends
  };
}

export default connect(mapStateToProps, { fetchFriends })(FriendList);
