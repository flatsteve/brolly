import React, { PureComponent } from "react";

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

  renderForecast(loading, currentTimeForecast, currentDayForecast) {
    if (loading) {
      return (
        <div className="empty-container">
          <p>Loading forcast...</p>
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
      <React.Fragment>
        <div className="forecast">
          <div className="precipitation">
            <h1 className="precipitation__title">
              {currentTimeForecast.precipitation.value}
              {currentTimeForecast.precipitation.unit}
            </h1>

            <p className="precipitation__description">
              <span className="typo-light">
                chance of rain <br />
                in the next
              </span>{" "}
              <strong>3 hours</strong>
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
                  <small className="typo-light">(feels)</small>
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
        </div>

        <HourlyForecast
          forecasts={currentDayForecast.hourlyForecast}
          updateCurrentTimeForecast={this.updateCurrentTimeForecast}
        />
      </React.Fragment>
    );
  }

  render() {
    const { loading, currentTimeForecast, currentDayForecast } = this.props;

    return (
      <div>
        <GradientBackground
          type={currentTimeForecast ? currentTimeForecast.type.class : null}
        />

        {this.renderForecast(loading, currentTimeForecast, currentDayForecast)}
      </div>
    );
  }
}
