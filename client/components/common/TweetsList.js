import React from 'react';
import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/TweetsActions';

class TweetsList extends React.Component {

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
    tweets: state.tweets.tweets
  };
}

export default connect(mapStateToProps)(TweetsList);