import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { initAuth } from "./actions/AuthActions";

import AuthHandler from "./components/AuthHandler";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Home from "./scenes/Home";
import ListManager from "./scenes/ListManager";
import NotFound from "./scenes/NotFound";

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
                <Route exact path="/" component={Home} />
                <Route path="/lists/:listId" component={Home} />
                <Route path="/manage" component={ListManager} />
                <Route path="/auth/:result" component={AuthHandler} />
                <Route component={NotFound} />
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
