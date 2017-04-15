import React from 'react';
import bars from '../../bars.svg';

const Spinner = (props) => (
  <div className="spinner-container">
    <img src={bars} width="40" />
  </div>
);

export default Spinner;