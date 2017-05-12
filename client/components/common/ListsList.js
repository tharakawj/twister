import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { fetchLists } from "../../actions/TweetsActions";

class ListsList extends React.Component {
  static defaultProps = {
    lists: null
  };

  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({
        id_str: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    fetchLists: PropTypes.func.isRequired
  };

  static renderLink(list, index) {
    let link = null;
    if (list.id_str) {
      link = (
        <NavLink
          key={index}
          to={`/lists/${list.id_str}`}
          className="list-group-item"
          activeClassName="active"
        >
          {list.name}
        </NavLink>
      );
    } else {
      link = (
        <NavLink
          exact
          key={index}
          to="/"
          className="list-group-item"
          activeClassName="active"
        >
          {list.name}
        </NavLink>
      );
    }
    return link;
  }

  componentDidMount() {
    if (!this.props.lists) this.props.fetchLists();
  }

  render() {
    let { lists } = this.props;
    if (lists) {
      lists = [{ name: "All" }, ...lists];
      return (
        <div className="list-group">
          {lists.map((list, index) => ListsList.renderLink(list, index))}
          <Link to="/manage" className="manage-link">Mange Lists</Link>
        </div>
      );
    }
    return <p>Loading lists...</p>;
  }
}

function mapStateToProps(state) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToProps, { fetchLists })(ListsList);
