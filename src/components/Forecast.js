import React, { Component } from "react";
import { isSameDay } from "date-fns";
import {
  getWeatherForecast,
  extract5DayForecast,
  getForecastForTime,
  getDailyForecasts
} from "../services/met";
import { withStore } from "../data/store";

import GradientBackground from "./GradientBackground";
import HourlyForecast from "./HourlyForecast";
import brollyIcon from "../icons/brolly.svg";
import temperatureIcon from "../icons/temperature.svg";
import windIcon from "../icons/wind.svg";

import "./Forecast.scss";

class Forecast extends Component {
  state = {
    loading: true,
    currentDayForecast: null,
    currentTimeForecast: null
  };

  componentDidMount() {
    this.getForecast();
  }

  componentDidUpdate(prevProps) {
    // Only update if the date or location changed
    if (
      prevProps.store.location.id !== this.props.store.location.id ||
      !isSameDay(prevProps.store.date, this.props.store.date)
    ) {
      this.getForecast();
    }
  }

  getForecast() {
    const { date, location, updateForecast, forecast } = this.props.store;

    // FOR DEV TESTING ONLY - DONT REFRESH FORECAST EVERY TIME
    if (window.location.hostname === "localhost" && forecast) {
      return this.setState({
        currentDayForecast: getDailyForecasts(forecast, date),
        currentTimeForecast: getForecastForTime(forecast, date),
        loading: false
      });
    }

    getWeatherForecast(location.id)
      .then(res => {
        const forecast = extract5DayForecast(res);
        updateForecast(forecast);

        this.setState({
          currentDayForecast: getDailyForecasts(forecast, date),
          currentTimeForecast: getForecastForTime(forecast, date),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getBrollyRotation = () => {
    const { value } = this.state.currentTimeForecast.precipitation;

    return {
      transform: `rotate(-${180 / (100 / value)}deg)`
    };
  };

  render() {
    console.log("FORECAST RERENDERED");
    const { loading, currentTimeForecast, currentDayForecast } = this.state;

    return (
      <div>
        <GradientBackground
          type={currentTimeForecast ? currentTimeForecast.type.class : null}
        />

        {loading && <p>Loading...</p>}

        {!loading && currentTimeForecast ? (
          <div>
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
                  style={this.getBrollyRotation()}
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

              <h4 className="summary">
                {currentTimeForecast.type.description}
              </h4>
            </div>

            <HourlyForecast forecasts={currentDayForecast.hourlyForecast} />
          </div>
        ) : (
          <p>No forecast available</p>
        )}
      </div>
    );
  }
}

export default withStore(Forecast);
