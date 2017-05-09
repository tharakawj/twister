import React from "react";
import { shallow } from "enzyme";
import { Switch } from "react-router-dom";
import { App } from "./App";
import Spinner from "./components/common/Spinner";

describe("App", function() {
  it("renders Spinner when data is loading.", function() {
    const props = {
      isLoading: true
    };
    const app = shallow(<App {...props} />);
    expect(app.find(Spinner).length).toBe(1);
  });

  it("renders Switch when data isn't loading.", function() {
    const props = {
      isLoading: false
    };
    const app = shallow(<App {...props} />);
    expect(app.find(Switch).length).toBe(1);
  });
});
