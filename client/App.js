import React, { Component } from 'react';
import Header from './components/common/Header'
import './App.css';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <img src={logo} className="App-logo" alt="logo" />
        <Header loading={this.props.loading}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;