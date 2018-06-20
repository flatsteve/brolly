import React from "react";
import { addHours, format } from "date-fns";

import "./HourlyForecast.scss";

const HourlyForecast = props => {
  return (
    <div className="hourly-forecast">
      {props.forecasts.map((forecast, index) => {
        return (
          <div key={index} className="hourly-forecast__item">
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
