import React from 'react';

const List = ({ list }) => {
  return (
    <div className="car-list-item">
      { list.name }
    </div>
  );
};

export default List;