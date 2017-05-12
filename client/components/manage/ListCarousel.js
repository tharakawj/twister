import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchLists,
  fetchMembers,
  addMemberToList
} from "../../actions/TweetsActions";

import List from "./List";

class ListCarousel extends Component {
  static defaultProps = {
    lists: null
  };

  static propTypes = {
    fetchLists: PropTypes.func.isRequired,
    fetchMembers: PropTypes.func.isRequired,
    addMemberToList: PropTypes.func.isRequired,
    lists: PropTypes.arrayOf(PropTypes.object)
  };

  componentDidMount() {
    if (!this.props.lists) this.props.fetchLists();
  }

  render() {
    const { lists, fetchMembers: fm, addMemberToList: aml } = this.props;
    if (lists) {
      return (
        <div className="list-carousel">
          <ul>
            {lists.map(list => (
              <li key={list.id_str}>
                <List list={list} fetchMembers={fm} addMemberToList={aml} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p>Loading lists...</p>;
  }
}

function mapStateToPops(state) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToPops, {
  fetchLists,
  fetchMembers,
  addMemberToList
})(ListCarousel);
