import React from "react";
import FriendList from "./FriendList";
import ListCarousel from "./ListCarousel";

class ManagePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Manage Lists</h1>
        <div>
          <FriendList />
          <ListCarousel />
        </div>
      </div>
    );
  }
}

export default ManagePage;
