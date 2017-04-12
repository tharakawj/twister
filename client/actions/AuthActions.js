import { ACCESS_TOKEN_KEY } from '../constants/AppConstants';
import * as types from '../constants/ActionTypes';

export function initAuth() {
  return dispatch => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      return dispatch(authUser(accessToken));
    }else{
      return dispatch(appLoaded());
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

function fetchAuthedUser(accessToken) {
  return dispatch =>
    fetch('/api/account/verify_credentials?skip_status=true',{
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => dispatch(receiveAuthedUserPre(accessToken, json)))
    .catch(err => { dispatch(resetAuthed()) });
}

function receiveAuthedUserPre(accessToken, user) {
  return dispatch => {
    dispatch(receiveAccessToken(accessToken));
    dispatch(receiveAuthedUser(user));
    dispatch(appLoaded());
  };
}

function resetAuthed() {
  return dispatch => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(resetAuthedPost());
  }
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

function resetAuthedPost() {
  return {
    type: types.RESET_AUTHED
  };
}

function appLoaded() {
  return {
    type: types.APP_LOADED
  };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}