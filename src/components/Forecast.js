import React, { Component } from "react";
import {
  getWeatherForecast,
  extract5DayForecast,
  getCurrentTimeForecast,
  getCurrentDayForecast
} from "../services/met";
import { withStore } from "../data/store";
import HourlyForecast from "./HourlyForecast";
import brolly from "../icons/brolly.svg";
import temperature from "../icons/temperature.svg";
import wind from "../icons/wind.svg";

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.store.location.id !== this.props.store.location.id) {
      this.getForecast();
    }
  }

  getForecast() {
    const { location, updateForecast, forecast } = this.props.store;

    // FOR DEV TESTING ONLY - DONT REFRESH FORECAST EVERY TIME
    if (window.location.hostname === "localhost" && forecast) {
      return this.setState({
        currentDayForecast: getCurrentDayForecast(forecast),
        currentTimeForecast: getCurrentTimeForecast(forecast),
        loading: false
      });
    }

    getWeatherForecast(location.id)
      .then(res => {
        const forecast = extract5DayForecast(res);
        updateForecast(forecast);

        this.setState({
          currentDayForecast: getCurrentDayForecast(forecast),
          currentTimeForecast: getCurrentTimeForecast(forecast),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { loading, currentTimeForecast, currentDayForecast } = this.state;

    return (
      <div>
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
                    dangerouslySetInnerHTML={{ __html: temperature }}
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
                  dangerouslySetInnerHTML={{ __html: brolly }}
                />

                <div className="main__item wind">
                  <div
                    className="wind__icon"
                    dangerouslySetInnerHTML={{ __html: wind }}
                  />

                  <p>
                    {currentTimeForecast.wind_speed.value}
                    <small className="typo-light">
                      {currentTimeForecast.wind_speed.unit}
                    </small>
                  </p>
                </div>
              </div>

              <h4 className="summary">{currentTimeForecast.type.value}</h4>
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
