import * as types from "../constants/ActionTypes";

const initialState = {
  tweets: [],
  loadingTweets: true,
  maxId: null,
  lists: null,
  friends: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCHING_TWEETS:
      return Object.assign({}, state, {
        tweets: [],
        loadingTweets: true
      });

    case types.FETCHING_MORE_TWEETS:
      return Object.assign({}, state, {
        loadingTweets: true
      });

    case types.RECEIVE_TWEETS:
      return Object.assign({}, state, {
        tweets: action.tweets,
        maxId:
          action.tweets.length > 0
            ? action.tweets[action.tweets.length - 1].id_str
            : null,
        loadingTweets: false
      });

    case types.RECEIVE_MORE_TWEETS:
      return Object.assign({}, state, {
        tweets: [...state.tweets, ...action.tweets],
        maxId:
          action.tweets.length > 0
            ? action.tweets[action.tweets.length - 1].id_str
            : null,
        loadingTweets: false
      });

    case types.RECEIVE_LISTS:
      return Object.assign({}, state, {
        lists: action.lists
      });

    case types.RECEIVE_FRIENDS:
      return Object.assign({}, state, {
        friends: action.friends
      });
    case types.RECEIVE_MEMBERS:
      return {
        ...state,
        lists: state.lists.map(
          list =>
            list.id_str === action.listId
              ? { ...list, members: action.members }
              : list
        )
      };
    case types.ADD_MEMBER: {
      const member = state.friends.find(e => e.id_str === action.memberId);
      return !member
        ? state
        : {
            ...state,
            lists: state.lists.map(
              list =>
                list.id_str === action.listId
                  ? { ...list, members: [member, ...list.members] }
                  : list
            )
          };
    }
    default:
      return state;
  }
}
