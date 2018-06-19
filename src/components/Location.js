import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import location from "../icons/location.svg";

import "./Location.scss";

class Location extends Component {
  state = {
    locationName: this.props.store.location.name
  };

  requestLocation = () => {
    getGeoLocation().then(({ coords: { latitude, longitude } }) => {
      getClosestLocation({ latitude, longitude })
        .then(location => {
          this.props.store.updateLocation(location);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  render() {
    const { locationName } = this.state;

    return (
      <div className="location">
        <input className="location-input" defaultValue={locationName} />

        <div
          className="location-icon"
          onClick={() => this.requestLocation()}
          dangerouslySetInnerHTML={{ __html: location }}
        />
      </div>
    );
  }
}

export default withStore(Location);
