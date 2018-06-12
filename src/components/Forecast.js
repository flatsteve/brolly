import React, { Component } from "react";
import {
  getWeatherForecast,
  extract5DayForecast,
  getCurrentForecast
} from "../services/met";
import { withStore } from "../data/store";

class Forecast extends Component {
  state = {
    loading: true,
    currentForecast: null
  };

  componentDidMount() {
    const { location, updateForecast, forecast } = this.props.store;

    // FOR DEV TESTING ONLY - DONT REFRESH FORECAST EVERY TIME
    if (forecast) {
      return this.setState({
        currentForecast: getCurrentForecast(forecast),
        loading: false
      });
    }

    getWeatherForecast(location.id)
      .then(res => {
        const forecast = extract5DayForecast(res);
        updateForecast(forecast);

        this.setState({
          currentForecast: getCurrentForecast(forecast),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { loading, currentForecast } = this.state;

    return (
      <div>
        {loading && <p>Loading...</p>}

        {!loading && currentForecast ? (
          <div>
            <p>
              Temp: {currentForecast.temperature.value}
              {currentForecast.temperature.unit} (feels like{" "}
              {currentForecast.temperature_feel.value})
            </p>

            <p>
              Chance of rain: {currentForecast.precipitation.value}
              {currentForecast.precipitation.unit}
            </p>
          </div>
        ) : (
          <p>No forecast available</p>
        )}
      </div>
    );
  }
}

export default withStore(Forecast);
