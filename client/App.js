import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/common/Header';
import { initAuth } from './actions/AuthActions';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth());
  }

  render() {
    return (
      <div className="container">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);