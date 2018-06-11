import React, { Component } from "react";
import { getWeatherForecast } from "../services/met";

export default class Location extends Component {
  componentDidMount() {
    getWeatherForecast(location.id)
      .then(res => {
        console.log(res.data.SiteRep);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>Temp: </p>
      </div>
    );
  }
}
