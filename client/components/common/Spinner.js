import React from 'react';
import bars from '../../bars.svg';

class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <img src={bars} width="40"/>
      </div>
    );
  }
}

export default Spinner;