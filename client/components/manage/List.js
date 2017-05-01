import React, { Component } from 'react';

class List extends Component {
  componentDidMount() {
    const { list, fetchMembers } = this.props;
    if(!list.members){
      fetchMembers(list.id_str);
    }
  }
  
  render() {
    const { list } = this.props;
    return (
      <div className="car-list-item">
        <h3>{ list.name }</h3>
        <p>{ list.members ? list.members.length : "Loading"}</p>
      </div>
    );
  }
}

export default List;