import * as types from '../constants/ActionTypes';

export function fetchLatestTweets(){
  return (dispatch, getState) => {

    const { auth } = getState();

    fetch('/api/statuses/home_timeline', {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`
      }
    })
    .then(response => response.json())
    .then(response => dispatch(receiveLatestTweets(response)))
    .catch(err => { throw err; });

  };
}

function receiveLatestTweets(tweets) {
  return {
    type: types.RECEIVE_LATEST_TWEETS,
    tweets,
  };
}

export function fetchLists(){
  return (dispatch, getState) => {
    
  }
}