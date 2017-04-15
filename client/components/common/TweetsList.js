import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import { fetchTweets } from '../../actions/TweetsActions';

export class TweetsList extends React.Component {

  componentDidMount() {
    const { dispatch, listId } = this.props;
    dispatch(fetchTweets(listId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, listId } = this.props;
    if(nextProps.listId !== listId){
      dispatch(fetchTweets(nextProps.listId));
    }
  }

  render() {
    const { tweets } = this.props;
    if(tweets){
      return (
        <ul className="tweets-list">
          {
            tweets.map((tweet) =>
              <li key={tweet.id_str} className="tweets-list-item">
                <Tweet tweet={tweet}/>
              </li>
            )
          }
        </ul>
      );
    }else{
      return (<p>Loading tweets...</p>);
    }
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets.tweets
  };
}

export default connect(mapStateToProps)(TweetsList);