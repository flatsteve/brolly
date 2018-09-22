import React from "react";
import { addHours, isBefore, isWithinRange, format } from "date-fns";

import "./HourlyForecast.scss";

const HourlyForecast = props => {
  const {
    hourlyForecasts,
    currentTimeForecast,
    updateCurrentTimeForecast
  } = props;

  const getForecastClass = forecast => {
    const now = Date.now();
    const selectedForecastTime = currentTimeForecast.time;

    // Rememebr forecast ends 3 ours after start
    if (isBefore(addHours(forecast.time, 3), now)) {
      return "hourly-forecast__item--past";
    }

    if (selectedForecastTime === forecast.time) {
      return "hourly-forecast__item--current";
    }

    return "";
  };

  return (
    <div className="hourly-forecast">
      {hourlyForecasts.map((forecast, index) => {
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
