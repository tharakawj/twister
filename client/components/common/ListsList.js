import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchLists } from '../../actions/TweetsActions';

class ListsList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLists());
  }

  render() {
    return (
      <div>
        { this.props.lists ? (
          <ul>
            {this.props.lists.map((list, index) =>
              <li key={index}>
                <Link to={ list.id_str ? `/lists/${list.id_str}` : "/"} activeClassName="active">{list.name}</Link>
              </li>
          )}
          </ul>
        ) :
          (<p>Loading lists...</p>)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToProps)(ListsList);