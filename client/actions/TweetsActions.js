import * as types from '../constants/ActionTypes';

export function fetchTweets(listId){
  return (dispatch, getState) => {

    const { auth } = getState();

    var url = listId ? `/api/lists/statuses?list_id=${listId}&count=50`:
      '/api/statuses/home_timeline?count=50';

    fetch(url, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`
      }
    })
    .then(response => response.json())
    .then(response => dispatch(receiveTweets(response)))
    .catch(err => { throw err; });
  };
}

function receiveTweets(tweets) {
  return {
    type: types.RECEIVE_TWEETS,
    tweets,
  };
}

export function fetchLists() {
  return (dispatch, getState) => {
    const { auth } = getState();

    fetch('/api/lists/list', {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`
      }
    })
    .then(response => response.json())
    .then(response => dispatch(receiveLists(response)))
    .catch(err => { throw err; });
  };
}

function receiveLists(lists) {
  return {
    type: types.RECEIVE_LISTS,
    lists,
  };
}

export function fetchFriends() {
  return (dispatch, getState) => {
    const { auth } = getState();

    fetch(`/api/friends/list?count=100`, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`
      }
    })
    .then(response => response.json())
    .then(response => dispatch(recieveFriends(response.users)))
    .catch(err => { throw err; })
  };
}

function recieveFriends(friends){
  return {
    type: types.RECEIVE_FRIENDS,
    friends
  };
}

export function fetchMembers(listId){
  return (dispatch, getState) => {
    const { auth } = getState();
    
    fetch(`/api/lists/members?list_id=${listId}`, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`
      }      
    })
    .then(response => response.json())
    .then(response => dispatch(recieveMembers(listId, response.users)))
    .catch(err => { throw err; })
  }
}

function recieveMembers(listId, members) {
  return {
    type: types.RECEIVE_MEMBERS,
    listId,
    members
  }
}