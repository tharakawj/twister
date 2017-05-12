import React from "react";

const LandingPage = () => (
  <div className="jumbotron">
    <h1>Twister</h1>
    <p>Alternative twitter web client where the lists are first class.</p>
    <a href="/auth/twitter/signin" className="btn btn-primary btn-lg">
      Sign In
    </a>
  </div>
);

export default LandingPage;
