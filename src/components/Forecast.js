import React, { PureComponent } from "react";
import { addHours, format, isToday, isTomorrow } from "date-fns";

import { getWindDirectionRotation } from "../services/met";
import Loading from "./common/Loading";
import GradientBackground from "./GradientBackground";
import HourlyForecast from "./HourlyForecast";
import brollyIcon from "../icons/brolly.svg";
import temperatureIcon from "../icons/temperature.svg";
import windIcon from "../icons/wind.svg";

import "./Forecast.scss";

export default class Forecast extends PureComponent {
  getBrollyRotation = currentTimeForecast => {
    const HALF_CIRCLE = 180;
    const { value } = currentTimeForecast.precipitation;

    return {
      transform: `rotate(-${HALF_CIRCLE / (100 / value)}deg)`
    };
  };

  getWindRotation = currentTimeForecast => {
    const { value } = currentTimeForecast.wind_direction;
    const rotation = getWindDirectionRotation(value);

    return {
      transform: `rotate(${rotation}deg)`
    };
  };

  getDayOfForecast(date) {
    if (isToday(date)) {
      return "Today";
    }

    if (isTomorrow(date)) {
      return "Tommorrow";
    }

    return `on ${format(date, "ddd")}`;
  }

  renderForecast(
    error,
    loading,
    currentTimeForecast,
    currentDayForecast,
    location
  ) {
    if (error) {
      return <p>Something went wrong: {error}</p>;
    }

    if (loading) {
      return <Loading locationName={location.name} />;
    }

    if (!currentTimeForecast) {
      return (
        <div className="empty-container">
          <p data-testid="no-forecast-text">
            No forecast available. Try refreshing.
          </p>
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
              chance between <br />
              <strong>
                {format(currentTimeForecast.time, "h")} -{" "}
                {format(addHours(currentTimeForecast.time, 3), "ha")}
              </strong>{" "}
              {this.getDayOfForecast(currentDayForecast.date)}
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
                <span>
                  {currentTimeForecast.temperature_feel.value}
                  {currentTimeForecast.temperature_feel.unit}
                </span>
                <br />
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
              style={this.getWindRotation(currentTimeForecast)}
              dangerouslySetInnerHTML={{ __html: windIcon }}
            />

            <p>
              {currentTimeForecast.wind_speed.value}
              <small className="typo-light">
                {currentTimeForecast.wind_speed.unit},{" "}
                {currentTimeForecast.wind_direction.value}
              </small>
            </p>
          </div>
        </div>

        <h4 className="summary" data-testid="forecast-summary-text">
          {currentTimeForecast.type.description}
        </h4>

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
      error,
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
          error,
          loading,
          currentTimeForecast,
          currentDayForecast,
          location
        )}
      </React.Fragment>
    );
  }
}
