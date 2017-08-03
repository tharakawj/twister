import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import { PROFILE } from "../../../constants/DragDropTypes";

const SHOW_MEMEBERS_COUNT = 7;

function isAlredayMember(members, id) {
  return members.filter(m => m.id_str === id).length !== 0;
}

class List extends PureComponent {
  static defaultProps = {
    item: null
  };

  static propTypes = {
    list: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id_str: PropTypes.string.isRequired
    }).isRequired,
    fetchMembers: PropTypes.func.isRequired,
    addMemberToList: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    item: PropTypes.shape({ id: PropTypes.string.isRequired })
  };

  componentDidMount() {
    const { list, fetchMembers } = this.props;
    if (!list.members) {
      fetchMembers(list.id_str);
    }
  }

  render() {
    const { list, connectDropTarget, isOver, canDrop, item } = this.props;
    const overStyle = isOver ? { transform: "scale(1.08, 1.08)" } : {};
    const dropStyle = {
      background: canDrop
        ? "rgba(176, 219, 244, 0.5)"
        : "rgba(255, 204, 204, 0.5)"
    };

    return connectDropTarget(
      <div className="car-list-item" style={overStyle}>
        <div>
          <h4>
            {list.name}
          </h4>
          {list.mode !== "public" &&
            <span className="glyphicon glyphicon-lock pull-right" />}
        </div>
        <div className="car-list-item-line">
          {list.members ? list.members.length : list.member_count} members
        </div>
        <div>
          <p>
            {list.description || <span>No description</span>}
          </p>
        </div>
        <div className="members">
          {list.members
            ? list.members
                .slice(0, SHOW_MEMEBERS_COUNT)
                .map(member =>
                  <img
                    key={member.id_str}
                    src={member.profile_image_url_https}
                    alt={member.name}
                  />
                )
                .concat(
                  list.members.length > SHOW_MEMEBERS_COUNT &&
                    <div key="0">
                      +{list.members.length - SHOW_MEMEBERS_COUNT}
                    </div>
                )
            : "Loading..."}
        </div>
        {isOver &&
          <div className="overlay" style={dropStyle}>
            {isAlredayMember(list.members, item.id) &&
              <div>Already in the list</div>}
          </div>}
      </div>
    );
  }
}

const squareTarget = {
  drop(props, monitor) {
    props.addMemberToList(props.list.id_str, monitor.getItem().id);
  },
  canDrop(props, monitor) {
    const draggedProfileId = monitor.getItem().id;
    return (
      // members array should have been fetched
      props.list.members &&
      // drapped profile shouldn't be already in the members list
      !isAlredayMember(props.list.members, draggedProfileId)
    );
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  };
}

export default DropTarget(PROFILE, squareTarget, collect)(List);
