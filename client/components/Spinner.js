import React from "react";
import bars from "../bars.svg";

const Spinner = () =>
  <div className="spinner-container">
    <img src={bars} width="30" alt="Loading animation" />
  </div>;

export default Spinner;
