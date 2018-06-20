import React, { Component } from "react";
import { getGeoLocation, getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import locationIcon from "../icons/location.svg";

import "./Location.scss";

class Location extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.store.location.id !== this.props.store.location.id;
  }

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
    console.log("LOCATION RERENDERED");
    const { location } = this.props.store;

    return (
      <div className="location">
        <input className="location-input" value={location.name} />

        <div
          className="location-icon"
          onClick={() => this.requestLocation()}
          dangerouslySetInnerHTML={{ __html: locationIcon }}
        />
      </div>
    );
  }
}

export default withStore(Location);
