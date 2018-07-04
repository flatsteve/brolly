import React, { Component } from "react";
import { withStore } from "../data/store";
import { getForecastForTime } from "../services/met";

import "./GradientBackground.scss";

class GradientBackground extends Component {
  render() {
    const { date, forecast } = this.props.store;
    const currentTimeForecast = getForecastForTime(forecast, date);
    const bkClass = currentTimeForecast.type.class || null;

    return <div className={`background background--${bkClass}`} />;
  }
}

export default withStore(GradientBackground);
