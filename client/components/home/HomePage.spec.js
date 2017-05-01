import React from "react";
import { shallow } from "enzyme";
import { HomePage } from "./HomePage";
import TweetsList from "../common/TweetsList";
import ListsList from "../common/ListsList";

describe("Home Page", function() {
  it("renders TweetsList and ListsList when user is given.", function() {
    const props = {
      user: {},
      params: { listId: "001" }
    };
    const homePage = shallow(<HomePage {...props} />);
    expect(homePage.find(TweetsList).length).toBe(1);
    expect(homePage.find(ListsList).length).toBe(1);
    expect(homePage.find(TweetsList).props().listId).toBe("001");
  });

  it("renders  when user isn't given.", function() {
    const props = {
      params: {}
    };
    const homePage = shallow(<HomePage {...props} />);
    expect(homePage.find("div.jumbotron").length).toBe(1);
    expect(homePage.find("h1").text()).toBe("Twister");
  });
});
