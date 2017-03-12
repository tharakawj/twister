import { ACCESS_TOKEN_KEY } from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function initAuth() {
  return dispatch => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return dispatch(authUser(accessToken));
    }
    return null;
  };
}

export function authUser(accessToken) {
  return dispatch =>
    dispatch(fetchAuthedUser(accessToken));
}

export function signoutUser(accessToken) {
  return dispatch =>
    fetch('/auth/twitter/signout', {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(response => dispatch(resetAuthed()))
    .catch(err => { throw err; });
}

function fetchAuthedUser(accessToken, shouldShowStream) {
  return dispatch =>
    fetch('/api/me',{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAuthedUserPre(accessToken, json)))
    .catch(err => { throw err; });
}

function receiveAuthedUserPre(accessToken, user) {
  return dispatch => {
    dispatch(receiveAccessToken(accessToken));
    dispatch(receiveAuthedUser(user));
  };
}

function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    accessToken,
  };
}

function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user,
  };
}

function resetAuthed() {
  return {
    type: types.RESET_AUTHED
  };
}