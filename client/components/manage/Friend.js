import React from 'react';

const Friend = ({friend}) => {
  return (
    <li>
      { friend.name }
    </li>
  );
};

export default Friend;