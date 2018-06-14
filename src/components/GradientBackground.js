import React, { Component } from "react";
import { withStore } from "../data/store";
import "./GradientBackground.css";

class GradientBackground extends Component {
  render() {
    return (
      <div className="gradient-background gradient-background--low">
        {this.props.children}
      </div>
    );
  }
}

export default withStore(GradientBackground);
