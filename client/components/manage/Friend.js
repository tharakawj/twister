import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

import { PROFILE } from "../../constants/DragDropTypes";

class Friend extends PureComponent {
  static propTypes = {
    friend: PropTypes.shape({
      id_str: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

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

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

export default DragSource(PROFILE, itemSource, collect)(Friend);
