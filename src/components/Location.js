import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { getWeatherObservation } from "../services/met";

export default class Location extends Component {
  requestLocation() {
    getGeoLocation()
      .then(({ coords }) => {
        const location = getClosestLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        });

        const observation = getWeatherObservation(location.id);

        console.log("LOC", location);
        console.log("REPORT", observation);
      })
      .catch(error => {
        console.warn(`Something went wrong. ${error.message}.`);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.requestLocation}>Get location</button>
      </div>
    );
  }
}
