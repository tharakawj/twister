import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

import FriendList from "./FriendList";
import ListCarousel from "./ListCarousel";

class ManagePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Manage Lists</h1>
        <DragDropContextProvider backend={HTML5Backend}>
          <div>
            <FriendList />
            <ListCarousel />
          </div>
        </DragDropContextProvider>
      </div>
    );
  }
}

export default ManagePage;
