import React, { Component } from "react";

import { getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import locationIcon from "../icons/location.svg";
import Spinner from "./common/Spinner";

import "./Location.scss";

export class Location extends Component {
  state = {
    loading: false,
    expanded: false,
    search: ""
  };

  handleSearch = e => {
    // Query API for locations starting with with what is typed

    this.setState({
      search: e.target.value
    });
  };

  setExpanded = expanded => {
    this.setState({
      expanded
    });
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
    const { loading, expanded, search } = this.state;
    const { location } = this.props.store;

    return (
      <div
        className={`location ${
          expanded ? "location--expanded" : "locaton--colapsed"
        }`}
      >
        <div className="location__control">
          <input
            className="location__control__input"
            defaultValue={location.name}
            onChange={this.handleSearch}
            onClick={() => this.setExpanded(true)}
          />

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

        {expanded && (
          <div>
            <div>{search}</div>

            <button onClick={() => this.setExpanded(false)}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default withStore(Location);
