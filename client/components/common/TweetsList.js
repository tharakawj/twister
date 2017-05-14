import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchTweets } from "../../actions/TweetsActions";

import Tweet from "./Tweet";
import TweetsListPlaceholder from "./TweetsListPlaceholder";

export class TweetsList extends React.Component {
  static defaultProps = {
    tweets: null,
    listId: null
  };

  static propTypes = {
    tweets: PropTypes.arrayOf(
      PropTypes.shape({ id_str: PropTypes.string.isRequired })
    ),
    loading: PropTypes.bool.isRequired,
    listId: PropTypes.string,
    fetchTweets: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { listId, fetchTweets: ft } = this.props;
    ft(listId);
  }

  componentWillReceiveProps(nextProps) {
    const { listId, fetchTweets: ft } = this.props;
    if (nextProps.listId !== listId) {
      ft(nextProps.listId);
    }
  }

  render() {
    const { tweets, loading } = this.props;
    if (!loading) {
      return (
        <ul className="tweets-list">
          {tweets.map(tweet => (
            <li key={tweet.id_str} className="tweets-list-item">
              <Tweet tweet={tweet} />
            </li>
          ))}
        </ul>
      );
    }
    return <TweetsListPlaceholder />;
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets.tweets,
    loading: state.tweets.loadingTweets
  };
}

export default connect(mapStateToProps, { fetchTweets })(TweetsList);
