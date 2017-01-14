import React, { Component } from 'react';
import Header from './components/common/Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;