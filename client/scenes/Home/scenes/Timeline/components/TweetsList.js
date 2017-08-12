import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchTweets,
  fetchMoreTweets
} from "../../../../../actions/TweetsActions";

import Tweet from "./Tweet";
import TweetsListFooter from "./TweetsListFooter";
import NoTweetsMsg from "./NoTweetsMsg";
import TweetsListPlaceholder from "./TweetsListPlaceholder";

export class TweetsList extends React.Component {
  static defaultProps = {
    tweets: null,
    listId: null,
    list: null
  };

  static propTypes = {
    tweets: PropTypes.arrayOf(
      PropTypes.shape({ id_str: PropTypes.string.isRequired })
    ),
    loading: PropTypes.bool.isRequired,
    listId: PropTypes.string,
    list: PropTypes.shape({ full_name: PropTypes.string.isRequired }),
    fetchTweets: PropTypes.func.isRequired,
    fetchMoreTweets: PropTypes.func.isRequired
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
    const { tweets, loading, listId, list, fetchMoreTweets: fmt } = this.props;
    return (
      <div>
        <ul className="tweets-list">
          {tweets.map(tweet =>
            <li key={tweet.id_str} className="tweets-list-item">
              <Tweet tweet={tweet} />
            </li>
          )}
        </ul>
        {tweets.length === 0 &&
          (loading ? <TweetsListPlaceholder /> : <NoTweetsMsg list={list} />)}
        {tweets.length !== 0 &&
          <TweetsListFooter loading={loading} loadMore={() => fmt(listId)} />}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    tweets: state.tweets.tweets,
    loading: state.tweets.loadingTweets,
    list: state.tweets.lists
      ? state.tweets.lists.find(l => l.id_str === props.listId)
      : null
  };
}

export default connect(mapStateToProps, { fetchTweets, fetchMoreTweets })(
  TweetsList
);
