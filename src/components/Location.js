import React, { Component } from "react";

import { getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import locationIcon from "../icons/location.svg";
import Spinner from "./common/Spinner";

import "./Location.scss";

export class Location extends Component {
  state = {
    loading: false
  };

  requestLocation = () => {
    this.setState({
      loading: true
    });

    getClosestLocation()
      .then(res => {
        this.props.store.updateLocation(res.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { loading } = this.state;
    const { location } = this.props.store;

    return (
      <div className="location">
        <input className="location-input" value={location.name} />

        {loading ? (
          <Spinner />
        ) : (
          <div
            className="location-icon"
            onClick={() => this.requestLocation()}
            dangerouslySetInnerHTML={{ __html: locationIcon }}
          />
        )}
      </div>
    );
  }
}

export default withStore(Location);
