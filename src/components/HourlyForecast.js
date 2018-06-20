import React from "react";
import { format } from "date-fns";

import "./HourlyForecast.scss";

const HourlyForecast = props => {
  return (
    <div className="hourly-forecast">
      {props.forecasts.map((forecast, index) => {
        return (
          <div key={index}>
            <p>{format(forecast.time, "ha")}</p>

            <p>
              {forecast.precipitation.value}
              {forecast.precipitation.unit}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;
