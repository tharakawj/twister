import React from "react";
import { shallow } from "enzyme";
import { HomePage } from "./HomePage";
import TweetsList from "../common/TweetsList";
import ListsList from "../common/ListsList";
import LandingPage from "../common/LandingPage";

describe("HomePage", function() {
  it("renders TweetsList and ListsList when user is given.", function() {
    const props = {
      user: {},
      match: { params: { listId: "001" } }
    };
    const homePage = shallow(<HomePage {...props} />);
    expect(homePage.find(TweetsList).length).toBe(1);
    expect(homePage.find(ListsList).length).toBe(1);
    expect(homePage.find(TweetsList).props().listId).toBe("001");
  });

  it("renders LandingPage when user isn't given.", function() {
    const props = {
      params: {}
    };
    const homePage = shallow(<HomePage {...props} />);
    expect(homePage.find(LandingPage).length).toBe(1);
  });
});
