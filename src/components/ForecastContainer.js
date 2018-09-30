import React, { Component } from "react";
import { isSameDay } from "date-fns";

import { withStore } from "../data/store";
import { getWeatherForecast } from "../services/api";
import {
  extract5DayForecast,
  getForecastForTime,
  getDailyForecasts
} from "../services/met";
import Forecast from "./Forecast";

class ForecastContainer extends Component {
  state = {
    error: false,
    loading: true,
    currentDayForecast: null,
    currentTimeForecast: null
  };

  componentDidMount() {
    this.getForecast();
  }

  componentDidUpdate(prevProps) {
    // If the location changed fetch a new forecast
    if (prevProps.store.location.id !== this.props.store.location.id) {
      this.getForecast();
    }

    // if the date changed update the current day/time forecast to date within 5 day forecast
    if (!isSameDay(prevProps.store.date, this.props.store.date)) {
      this.updateCurrentDayForecast(
        this.props.store.forecast,
        this.props.store.date,
        this.state.currentTimeForecast
      );
    }
  }

  getForecast() {
    const { date, location, updateForecast } = this.props.store;

    this.setState({ loading: true });

    getWeatherForecast(location.id)
      .then(res => {
        const forecast = extract5DayForecast(res);
        updateForecast(forecast);

        this.updateCurrentDayForecast(forecast, date);
      })
      .catch(({ response }) => {
        this.setState({ error: response.data.error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  updateCurrentDayForecast = (forecast, date, currentTimeForecast) => {
    this.setState({
      currentDayForecast: getDailyForecasts(forecast, date),
      currentTimeForecast: getForecastForTime(
        forecast,
        date,
        currentTimeForecast
      )
    });
  };

  updateCurrentTimeForecast = forecast => {
    this.setState({
      currentTimeForecast: forecast
    });
  };

  render() {
    const {
      error,
      loading,
      currentTimeForecast,
      currentDayForecast
    } = this.state;

    const { location } = this.props.store;

    return (
      <Forecast
        error={error}
        loading={loading}
        currentDayForecast={currentDayForecast}
        currentTimeForecast={currentTimeForecast}
        location={location}
        updateCurrentTimeForecast={this.updateCurrentTimeForecast}
      />
    );
  }
}

export default withStore(ForecastContainer);
