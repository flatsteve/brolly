import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";

import "./Location.scss";

class Location extends Component {
  requestLocation = updateLocation => {
    getGeoLocation().then(({ coords: { latitude, longitude } }) => {
      const location = getClosestLocation({ latitude, longitude });

      updateLocation(location);
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
