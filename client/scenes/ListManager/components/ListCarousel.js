import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchLists,
  fetchMembers,
  addMemberToList
} from "../../../actions/TweetsActions";

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
        <div className="panel panel-default">
          <div className="list-carousel panel-body">
            {lists.length > 0
              ? <ul>
                  {lists.map(list =>
                    <li key={list.id_str}>
                      <List
                        list={list}
                        fetchMembers={fm}
                        addMemberToList={aml}
                      />
                    </li>
                  )}
                </ul>
              : <div className="alert alert-info" role="alert">
                  <p>
                    You dont have any list to show here.{" "}
                    <a
                      href="https://twitter.com/lists"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <b>Create a list</b>
                    </a>
                  </p>
                </div>}
          </div>
        </div>
      );
    }
    return <p>Loading lists...</p>;
  }
}

function mapStateToPops(state) {
  const ownLists = state.tweets.lists
    ? state.tweets.lists.filter(
        list => list.user.id_str === state.auth.user.id_str
      )
    : null;
  return {
    lists: ownLists
  };
}

export default connect(mapStateToPops, {
  fetchLists,
  fetchMembers,
  addMemberToList
})(ListCarousel);
