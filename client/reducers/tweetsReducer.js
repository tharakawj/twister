import * as types from "../constants/ActionTypes";

const initialState = {
  tweets: null,
  lists: null,
  friends: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_TWEETS:
      return Object.assign({}, state, {
        tweets: action.tweets
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
