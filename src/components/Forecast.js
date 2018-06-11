import React, { Component } from "react";
import {
  getWeatherForecast,
  extract5DayForecast,
  getCurrentForecast
} from "../services/met";
import { withStore } from "../data/store";

class Forecast extends Component {
  state = {
    currentForecast: null
  };

  componentDidMount() {
    const { location, updateForecast } = this.props.store;

    getWeatherForecast(location.id)
      .then(res => {
        const forecast = extract5DayForecast(res);
        updateForecast(forecast);

        this.setState({ currentForecast: getCurrentForecast(forecast) });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log("STORE", this.props.store);

    return (
      <div>
        {this.props.store.forecast && <p>Temp: </p>}

        {!this.props.store.forecast && <p>Loading...</p>}
      </div>
    );
  }
}

export default withStore(Forecast);
