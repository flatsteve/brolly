import React, { PureComponent } from "react";
import { addHours, format } from "date-fns";

import GradientBackground from "./GradientBackground";
import HourlyForecast from "./HourlyForecast";
import brollyIcon from "../icons/brolly.svg";
import temperatureIcon from "../icons/temperature.svg";
import windIcon from "../icons/wind.svg";

import "./Forecast.scss";

export default class Forecast extends PureComponent {
  getBrollyRotation = currentTimeForecast => {
    const { value } = currentTimeForecast.precipitation;

    return {
      transform: `rotate(-${180 / (100 / value)}deg)`
    };
  };

  renderForecast(loading, currentTimeForecast, currentDayForecast, location) {
    if (loading) {
      return (
        <div className="empty-container">
          <div
            className="brolly brolly--loading"
            dangerouslySetInnerHTML={{ __html: brollyIcon }}
          />

          <p>
            Loading forcast for {location.name}
            ...
          </p>
        </div>
      );
    }

    if (!currentTimeForecast) {
      return (
        <div className="empty-container">
          <p>No forecast available. Try refreshing.</p>
        </div>
      );
    }

    return (
      <div className="forecast">
        <div className="precipitation">
          <h1 className="precipitation__title">
            {currentTimeForecast.precipitation.value}
            {currentTimeForecast.precipitation.unit}
          </h1>

          <p className="precipitation__description">
            <span className="typo-light">
              chance of rain <br />
              between{" "}
              <strong>
                {format(currentTimeForecast.time, "h")} -{" "}
                {format(addHours(currentTimeForecast.time, 3), "ha")}
              </strong>
            </span>
          </p>
        </div>

        <div className="main">
          <div className="main__item temperature">
            <div
              className="temperature__icon"
              dangerouslySetInnerHTML={{ __html: temperatureIcon }}
            />

            <div>
              <p>
                {currentTimeForecast.temperature.value}
                {currentTimeForecast.temperature.unit}
              </p>

              <p>
                {currentTimeForecast.temperature_feel.value}
                {currentTimeForecast.temperature_feel.unit}{" "}
                <small className="typo-light typo-extra-small">(feels)</small>
              </p>
            </div>
          </div>

          <div
            className="brolly"
            style={this.getBrollyRotation(currentTimeForecast)}
            dangerouslySetInnerHTML={{ __html: brollyIcon }}
          />

          <div className="main__item wind">
            <div
              className="wind__icon"
              dangerouslySetInnerHTML={{ __html: windIcon }}
            />

            <p>
              {currentTimeForecast.wind_speed.value}
              <small className="typo-light">
                {currentTimeForecast.wind_speed.unit}
              </small>
            </p>
          </div>
        </div>

        <h4 className="summary">{currentTimeForecast.type.description}</h4>

        <HourlyForecast
          currentTimeForecast={currentTimeForecast}
          hourlyForecasts={currentDayForecast.hourlyForecast}
          updateCurrentTimeForecast={this.props.updateCurrentTimeForecast}
        />
      </div>
    );
  }

  render() {
    const {
      loading,
      currentTimeForecast,
      currentDayForecast,
      location
    } = this.props;

    return (
      <React.Fragment>
        <GradientBackground
          type={currentTimeForecast ? currentTimeForecast.type.class : null}
        />

        {this.renderForecast(
          loading,
          currentTimeForecast,
          currentDayForecast,
          location
        )}
      </React.Fragment>
    );
  }
}
