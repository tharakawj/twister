import React from 'react';
import { connect } from 'react-redux';
import { fetchLatestTweets } from '../../actions/TweetsActions';

class TweetsList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLatestTweets());
  }

  render() {
    return (
      <div>
        { this.props.tweets ? (
          <ul>
            {this.props.tweets.map((tweet) =>
              <li key={tweet.id_str}>
                <p>
                  {tweet.text}
                </p>
              </li>
          )}
          </ul>
        ) :
          (<p>Loading tweets...</p>)
        }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets.latestTweets
  };
}

export default connect(mapStateToProps)(TweetsList);