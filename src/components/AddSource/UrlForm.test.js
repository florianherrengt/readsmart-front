import React from "react";
import { shallow } from "enzyme";
import { UrlForm } from "./UrlForm";

describe("The UrlForm", () => {
  it("should validate a correct the url", () => {
    const wrapper = shallow(<UrlForm />);
    wrapper.setState({ value: "http://abc.com" });
    expect(wrapper.instance()._isValid()).toBe(true);
  });
  it.only("should add http:// if not present", () => {
    const wrapper = shallow(<UrlForm />);
    wrapper.setState({ value: "abc.com" });
    expect(wrapper.instance()._isValid()).toBe(true);
  });
  it("should validate a wrong the url", () => {
    const wrapper = shallow(<UrlForm />);
    wrapper.setState({ value: "not a url" });
    expect(wrapper.instance()._isValid()).toBe(false);
  });
  it("should always use the props.isValid when true", () => {
    const wrapper = shallow(<UrlForm isValid />);
    wrapper.setState({ value: "not a url" });
    expect(wrapper.instance()._isValid()).toBe(true);
  });
  it("should always use the props.isValid when false", () => {
    const wrapper = shallow(<UrlForm isValid={false} />);
    wrapper.setState({ value: "http://abc.com" });
    expect(wrapper.instance()._isValid()).toBe(false);
  });
  it("should call onChange when a url is valid", () => {
    const url = "http://abc.com";
    const onChange = jest.fn();
    const wrapper = shallow(<UrlForm onChange={onChange} />);
    wrapper.setState({ value: url });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(url);
  });
});
