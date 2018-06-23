import React from "react";
import { addHours, isBefore, isWithinRange, format } from "date-fns";

import "./HourlyForecast.scss";

const HourlyForecast = props => {
  const { forecasts, updateCurrentTimeForecast } = props;

  const getForecastClass = forecast => {
    const now = Date.now();

    // Rememebr forecast ends 3 ours after start
    if (isBefore(addHours(forecast.time, 3), now)) {
      return "hourly-forecast__item--past";
    }

    // console.log("NOW", format(now, "DD MM ha"));
    // console.log("FORECAST START", format(forecast.time, "DD MM ha"));
    // console.log("FORECAST END", format(addHours(forecast.time, 3), "DD MM ha"));

    // Return class for current time
    if (isWithinRange(now, forecast.time, addHours(forecast.time, 3))) {
      return "hourly-forecast__item--current";
    }

    return "";
  };

  return (
    <div className="hourly-forecast">
      {forecasts.map((forecast, index) => {
        return (
          <div
            key={index}
            className={`hourly-forecast__item ${getForecastClass(forecast)}`}
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
};

export default HourlyForecast;
