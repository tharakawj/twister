import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { initAuth } from "./actions/AuthActions";

import Header from "./components/common/Header";
import Spinner from "./components/common/Spinner";
import HomePage from "./components/home/HomePage";
import ManagePage from "./components/manage/ManagePage";
import AuthHandler from "./components/common/AuthHandler";
import NoMatch from "./components/common/NoMatch";

import "./App.css";

export class App extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    initAuth: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.initAuth();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <Router>
        <div className="container">
          <Header />
          {isLoading
            ? <div className="center-box">
                <Spinner />
              </div>
            : <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/lists/:listId" component={HomePage} />
                <Route path="/manage" component={ManagePage} />
                <Route path="/auth/:result" component={AuthHandler} />
                <Route component={NoMatch} />
              </Switch>}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading
  };
}

export default connect(mapStateToProps, { initAuth })(App);
