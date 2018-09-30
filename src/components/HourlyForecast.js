import React, { Component } from "react";
import { addHours, isBefore, format } from "date-fns";

import "./HourlyForecast.scss";

export default class HourlyForecast extends Component {
  constructor(props) {
    super(props);

    this.hoursContainer = React.createRef();
  }

  componentDidUpdate() {
    const conatinerEl = this.hoursContainer.current;
    const currentHourEl = conatinerEl.getElementsByClassName(
      "hourly-forecast__item--current"
    )[0];

    currentHourEl.scrollIntoView({ behavior: "smooth", inline: "center" });
  }

  getForecastClass = forecast => {
    const now = Date.now();
    const selectedForecastTime = this.props.currentTimeForecast.time;

    // Rememebr forecast ends 3 ours after start
    if (isBefore(addHours(forecast.time, 3), now)) {
      return "hourly-forecast__item--past";
    }

    if (selectedForecastTime === forecast.time) {
      return "hourly-forecast__item--current";
    }

    return "";
  };

  render() {
    const { hourlyForecasts, updateCurrentTimeForecast } = this.props;

    return (
      <div className="hourly-forecast" ref={this.hoursContainer}>
        {hourlyForecasts.map((forecast, index) => {
          return (
            <div
              key={index}
              className={`hourly-forecast__item ${this.getForecastClass(
                forecast
              )}`}
              onClick={() => updateCurrentTimeForecast(forecast)}
            >
              <h5>
                {forecast.precipitation.value}
                {forecast.precipitation.unit}
              </h5>

              <p>
                <small className="typo-light">
                  {format(forecast.time, "ha")} -{" "}
                  {format(addHours(forecast.time, 3), "ha")}
                </small>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}
