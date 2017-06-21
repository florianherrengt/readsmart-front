// import React from 'react';
// import { shallow } from 'enzyme';
import { getSourceType } from "./index";

describe("The AddSource component", () => {
  it("should return a type reddit", () => {
    const { type } = getSourceType("https://www.reddit.com/r/javascript");
    expect(type).toEqual("reddit");
  });
  it("should return a sub when type reddit", () => {
    const { type, sub } = getSourceType("https://www.reddit.com/r/javascript");
    expect(type).toEqual("reddit");
    expect(sub).toEqual("javascript");
  });
  it("should return a type hackernews", () => {
    const { type } = getSourceType("https://news.ycombinator.com/");
    expect(type).toEqual("hackernews");
  });
  it("should return a type medium", () => {
    const { type } = getSourceType("https://medium.com/something");
    expect(type).toEqual("medium");
  });
  it("should return a type medium for subdomain", () => {
    const { type } = getSourceType("https://medium.freecodecamp.com/");
    expect(type).toEqual("medium");
  });
});
