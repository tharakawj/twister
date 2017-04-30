import React from 'react';
import FriendList from './FriendList';

class ManagePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Manage Followings</h1>
        <FriendList/>
      </div>
    );
  }
}

export default ManagePage;