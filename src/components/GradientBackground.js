import React, { Component } from "react";
import { withStore } from "../data/store";

import "./GradientBackground.scss";

class GradientBackground extends Component {
  render() {
    return (
      <div className="background background--low">{this.props.children}</div>
    );
  }
}

export default withStore(GradientBackground);
