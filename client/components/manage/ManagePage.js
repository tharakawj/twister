import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

import FriendList from "./FriendList";
import ListCarousel from "./ListCarousel";

const ManagePage = () => (
  <div>
    <DragDropContextProvider backend={HTML5Backend}>
      <div>
        <h4>People</h4>
        <FriendList />
        <div className="manage-page-tip">
          Wanna add new members to a list? Just drag people to your lists.
        </div>
        <h4>Lists</h4>
        <ListCarousel />
      </div>
    </DragDropContextProvider>
  </div>
);

export default ManagePage;
