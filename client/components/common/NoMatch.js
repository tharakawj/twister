import React from 'react';
import {Link} from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Error 404</h1>
        <p>Nothing is here!</p>
        <Link to="/">Go to Home</Link>
      </div>
    );
  }
}

export default AboutPage;