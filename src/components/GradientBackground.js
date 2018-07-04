import React, { Component } from "react";
import { withStore } from "../data/store";

import "./GradientBackground.scss";

class GradientBackground extends Component {
  render() {
    const bkClass = this.props.type;

    return <div className={`background background--${bkClass}`} />;
  }
}

export default withStore(GradientBackground);
