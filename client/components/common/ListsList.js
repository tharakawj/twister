import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
        <NavLink key={index} to={ `/lists/${list.id_str}`} 
          className="list-group-item" activeClassName="active">{list.name}</NavLink>);
    }else{
      link = (
        <NavLink exact key={index} to="/"
        className="list-group-item" activeClassName="active">{list.name}</NavLink>);
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
      );
    }else{
      return (<p>Loading lists...</p>);
    }
  }
}

function mapStateToProps(state) {
  return {
    lists: state.tweets.lists
  };
}

export default connect(mapStateToProps)(ListsList);