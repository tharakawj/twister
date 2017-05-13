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
    const profileImageBigger = friend.profile_image_url_https.replace(
      /_normal./,
      "_bigger."
    );
    return connectDragSource(
      <div className="friend media">
        <div className="media-left">
          <img
            className="media-object"
            src={profileImageBigger}
            alt={friend.name}
          />
        </div>
        <div className="media-body">
          <h5 className="media-heading">{friend.name}</h5>
          <span className="friend-handler">@{friend.screen_name}</span>
        </div>
      </div>
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
