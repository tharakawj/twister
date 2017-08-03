import React from "react";
import { shallow } from "enzyme";
import { Home } from "./index";
import LandingPage from "./scenes/LandingPage";
import Timeline from "./scenes/Timeline";

describe("HomePage", () => {
  it("renders Timeline when user is given.", () => {
    const props = {
      user: { screen_name: "xxxx" },
      match: { params: { listId: "001" } }
    };
    const homePage = shallow(<Home {...props} />);
    expect(homePage.find(Timeline).length).toBe(1);
  });

  it("renders LandingPage when user isn't given.", () => {
    const props = {
      params: {}
    };
    const homePage = shallow(<Home {...props} />);
    expect(homePage.find(LandingPage).length).toBe(1);
  });
});
