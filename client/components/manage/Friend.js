import React from 'react';

const Friend = ({friend}) => {
  return (
    <li key={friend.id_str}>
      { friend.name }
    </li>
  );
};

export default Friend;