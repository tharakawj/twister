import * as types from '../constants/ActionTypes';

const initialState = {
  latestTweets: null
}

export default function authReducer(state = initialState, action){
  switch(action.type) {
    case types.RECEIVE_LATEST_TWEETS:
      return Object.assign({}, state, {
        latestTweets: action.tweets,
      });

    default:
      return state;
  }
}