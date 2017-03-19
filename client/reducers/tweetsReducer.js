import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: null,
  lists:null
}

export default function authReducer(state = initialState, action){
  switch(action.type) {
    case types.RECEIVE_TWEETS:
      return Object.assign({}, state, {
        tweets: action.tweets,
      });

    case types.RECEIVE_LISTS:
      return Object.assign({}, state, {
        lists: [{name:"All"},...action.lists]
      });

    default:
      return state;
  }
}