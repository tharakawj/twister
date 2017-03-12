import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/common/Header';
import { initAuth } from './actions/AuthActions';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth());
  }

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

export default connect()(App);