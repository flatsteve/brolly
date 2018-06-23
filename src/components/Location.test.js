import React from "react";
import { mount } from "enzyme";

import Location from "./Location";

describe("<Location />", () => {
  it("renders the Location", () => {
    const wrapper = mount(<Location />);
    console.log(wrapper.debug());
  });
});
