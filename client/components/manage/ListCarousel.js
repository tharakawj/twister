import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchLists, fetchMembers } from "../../actions/TweetsActions";

import List from "./List";

class ListCarousel extends Component {
  componentDidMount() {
    this.props.fetchLists();
  }

  render() {
    const { lists, fetchMembers } = this.props;
    if (lists) {
      return (
        <div className="list-carousel">
          <ul>
            {lists.map((list, index) => (
              <li key={list.id_str}>
                <List list={list} fetchMembers={fetchMembers} />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <p>Loading lists...</p>;
    }
  }
}

function mapStateToPops(state, ownParams) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToPops, { fetchLists, fetchMembers })(
  ListCarousel
);
