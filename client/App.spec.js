import React from "react";
import { shallow } from "enzyme";
import { Switch } from "react-router-dom";
import { App } from "./App";
import Spinner from "./components/Spinner";

describe("App", () => {
  it("renders Spinner when data is loading.", () => {
    const props = {
      isLoading: true,
      initAuth: () => {}
    };
    const app = shallow(<App {...props} />);
    expect(app.find(Spinner).length).toBe(1);
  });

  it("renders Switch when data isn't loading.", () => {
    const props = {
      isLoading: false,
      initAuth: () => {}
    };
    const app = shallow(<App {...props} />);
    expect(app.find(Switch).length).toBe(1);
  });
});
