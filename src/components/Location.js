import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";

import "./Location.scss";

class Location extends Component {
  requestLocation = updateLocation => {
    getGeoLocation().then(({ coords: { latitude, longitude } }) => {
      getClosestLocation({ latitude, longitude })
        .then(location => {
          updateLocation(location);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  render() {
    const { store } = this.props;

    return (
      <div>
        <input
          className="location-input"
          onFocus={() => this.requestLocation(store.updateLocation)}
          value={store.location.name}
        />
      </div>
    );
  }
}

export default withStore(Location);
