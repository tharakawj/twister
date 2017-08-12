import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchFriends } from "../../../actions/TweetsActions";

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
        <div className="panel panel-default">
          <div className="friends-list panel-body">
            {friends.length > 0
              ? <ul>
                  {friends.map(friend =>
                    <li key={friend.id_str}>
                      <Friend friend={friend} />
                    </li>
                  )}
                </ul>
              : <div className="alert alert-info" role="alert">
                  <p>
                    Start following people and you’ll see them here.{" "}
                    <a
                      href="https://twitter.com/who_to_follow/suggestions"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <b>Find people to follow</b>
                    </a>
                  </p>
                </div>}
          </div>
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
