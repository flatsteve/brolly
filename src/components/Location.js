import React, { Component } from "react";
import debounce from "lodash-es/debounce";

import { searchLocations } from "../services/api";
import { getClosestLocation } from "../services/geolocation";
import { withStore } from "../data/store";
import locationIcon from "../icons/location.svg";
import Spinner from "./common/Spinner";
import closeIcon from "../icons/close.svg";

import "./Location.scss";

export class Location extends Component {
  constructor(props) {
    super(props);

    this.queryLocations = debounce(this.queryLocations, 500);
  }

  state = {
    loading: false,
    expanded: false,
    search: this.props.store.location.name || "",
    results: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.store.location.id !== this.props.store.location.id) {
      this.setState({
        search: this.props.store.location.name
      });
    }
  }

  queryLocations = search => {
    this.setState({
      loading: true
    });

    searchLocations(search)
      .then(res => {
        this.setState({
          results: res.data
        });
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

  handleSearch = e => {
    const search = e.target.value;

    this.setState({
      search
    });

    this.queryLocations(search);
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

  setExpanded = expanded => {
    this.setState({
      expanded
    });
  };

  close = () => {
    this.setState({
      expanded: false,
      search: this.props.store.location.name
    });
  };

  render() {
    const { loading, expanded, results, search } = this.state;

    return (
      <div
        className={`location ${
          expanded ? "location--expanded" : "locaton--colapsed"
        }`}
      >
        {expanded && (
          <div className="location__header">
            <h4 className="location__title">Choose your location</h4>

            <div
              onClick={this.close}
              className="location__close"
              dangerouslySetInnerHTML={{ __html: closeIcon }}
            />
          </div>
        )}

        <div className="location__control">
          <input
            className="location__control__input"
            value={search}
            onChange={this.handleSearch.bind(this)}
            onClick={() => this.setExpanded(true)}
          />

          <div className="location__control__extra">
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
          </div>
        )}
      </div>
    );
  }
}

export default withStore(Location);
