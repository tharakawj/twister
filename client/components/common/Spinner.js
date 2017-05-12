import React from "react";
import bars from "../../bars.svg";

const Spinner = () => (
  <div className="spinner-container">
    <img src={bars} width="40" alt="Loading animation" />
  </div>
);

export default Spinner;
