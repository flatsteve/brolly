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
  const wrapper = shallow(<Location store={mockStore} />);
  const input = wrapper.find(".location__control__input");

  it("renders the location name in an input", () => {
    expect(input.props().value).toEqual("Glasgow");
  });

  it("expands to allow searching for locations", () => {
    input.simulate("click");

    expect(wrapper.find(".location__title").text()).toBe("Set your location");
  });
});
