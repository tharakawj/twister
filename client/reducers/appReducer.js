import * as types from "../constants/ActionTypes";

const initialState = {
  isLoading: true
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.APP_LOADED:
      return Object.assign({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
}
