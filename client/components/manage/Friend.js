import React, { PureComponent } from "react";
import { DragSource } from "react-dnd";

import { PROFILE } from "../../constants/DragDropTypes";

class Friend extends PureComponent {
  render() {
    const { friend, connectDragSource } = this.props;
    return connectDragSource(
      <li>
        {friend.name}
      </li>
    );
  }
}

const itemSource = {
  beginDrag(props) {
    return {
      id: props.friend.id_str,
      name: props.friend.name
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

export default DragSource(PROFILE, itemSource, collect)(Friend);
