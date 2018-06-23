import React from "react";
import { shallow } from "enzyme";
import { Location } from "./Location";

const mockStore = {
  location: {
    id: 1,
    name: "Glasgow"
  }
};

describe("<Location />", () => {
  it("renders the location name in an input", () => {
    const wrapper = shallow(<Location store={mockStore} />);
    const input = wrapper.find(".location-input");

    expect(input.props().value).toEqual("Glasgow");
  });
});
