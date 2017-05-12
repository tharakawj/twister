import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import { PROFILE } from "../../constants/DragDropTypes";

class List extends PureComponent {
  static propTypes = {
    list: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id_str: PropTypes.string.isRequired
    }).isRequired,
    fetchMembers: PropTypes.func.isRequired,
    addMemberToList: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { list, fetchMembers } = this.props;
    if (!list.members) {
      fetchMembers(list.id_str);
    }
  }

  render() {
    const { list, connectDropTarget, isOver } = this.props;
    const bg = isOver ? "red" : "#EE6050";
    return connectDropTarget(
      <div className="car-list-item" style={{ background: bg }}>
        <h3>{list.name}</h3>
        <p>{list.members ? list.members.length : "Loading"}</p>
      </div>
    );
  }
}

const squareTarget = {
  drop(props, monitor) {
    props.addMemberToList(props.list.id_str, monitor.getItem().id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(PROFILE, squareTarget, collect)(List);
