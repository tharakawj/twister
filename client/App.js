import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './components/common/Header';
import Spinner from './components/common/Spinner';
import { initAuth } from './actions/AuthActions';
import './App.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth());
  }

  render() {
    const { isLoading, children} = this.props;
    
    return (
      <div className="container">
        <Header/>
        { isLoading ? (<Spinner/>) : children }
      </div>
    );
  }
}

function mapStateToProps(state, ownParams) {
  return {
    isLoading: state.app.isLoading
  };
}

export default connect(mapStateToProps)(App);