import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { Consumer } from "../store";

export default class Location extends Component {
  requestLocation = () => {
    getGeoLocation()
      .then(({ coords: { latitude, longitude } }) => {
        const locationName = getClosestLocation({
          latitude,
          longitude
        }).name;

        console.log(locationName);
      })
      .catch(error => {
        console.warn(`Something went wrong. ${error.message}.`);
      });
  };

  render() {
    return (
      <div>
        <Consumer>
          {data => {
            console.log(data);

            return (
              <input onFocus={this.requestLocation} value={data.locationName} />
            );
          }}
        </Consumer>
      </div>
    );
  }
}
