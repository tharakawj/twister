import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { fetchLists } from '../../actions/TweetsActions';

class ListsList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchLists());
  }

  renderLink(list, index) {
    let link = null;
    if(list.id_str){
      link = (
        <Link key={index} to={ `/lists/${list.id_str}`} 
          className="list-group-item" activeClassName="active">{list.name}</Link>);
    }else{
      link = (
        <IndexLink key={index} to="/"
        className="list-group-item" activeClassName="active">{list.name}</IndexLink>);
    }
    return link
  }

  render() {
    const { lists } = this.props;
    if(lists){
      return (
        <div className="list-group">
          { lists.map((list, index) => this.renderLink(list, index))}
        </div>
      )
    }else{
      return (<p>Loading lists...</p>)
    }
  }
}

function mapStateToProps(state) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToProps)(ListsList);