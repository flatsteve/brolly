import React, { Component } from "react";
import { isSameDay } from "date-fns";

import Forecast from "./Forecast";
import {
  getWeatherForecast,
  extract5DayForecast,
  getForecastForTime,
  getDailyForecasts
} from "../services/met";
import { withStore } from "../data/store";

class ForecastContainer extends Component {
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

  updateCurrentTimeForecast = forecast => {
    this.setState({
      currentTimeForecast: forecast
    });
  };

  render() {
    console.log("FORECAST RERENDERED");
    const { loading, currentTimeForecast, currentDayForecast } = this.state;

    return (
      <Forecast
        loading={loading}
        currentDayForecast={currentDayForecast}
        currentTimeForecast={currentTimeForecast}
      />
    );
  }
}

export default withStore(ForecastContainer);
