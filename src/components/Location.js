import React, { Component } from "react";

import { searchLocations } from "../services/api";
import { getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import locationIcon from "../icons/location.svg";
import Spinner from "./common/Spinner";

import "./Location.scss";

export class Location extends Component {
  state = {
    loading: false,
    expanded: false,
    search: "",
    results: []
  };

  handleSearch = e => {
    const search = e.target.value;

    // Query API for locations starting with with what is typed
    searchLocations(search).then(res => {
      this.setState({
        results: res.data
      });
    });

    this.setState({
      search
    });
  };

  setExpanded = expanded => {
    this.setState({
      expanded
    });
  };

  setLocation = location => {
    this.props.store.updateLocation(location);
    this.setExpanded(false);
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
    const { loading, expanded, results } = this.state;
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
            {results.length ? (
              <div className="location-results">
                {results.map(location => {
                  return (
                    <p
                      key={location.id}
                      onClick={() => this.setLocation(location)}
                    >
                      {location.name}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p>No results found</p>
            )}

            <button onClick={() => this.setExpanded(false)}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default withStore(Location);
