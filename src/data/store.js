import React, { Component, createContext } from "react";
import { getItem, setItem } from "../services/storage";

const INITIAL_LOCATION = {
  elevation: "4.0",
  id: "99015",
  latitude: "54.067",
  longitude: "-6.183",
  name: "Killowen",
  region: "ni",
  unitaryAuthArea: "County Down"
};

const store = createContext({ location: INITIAL_LOCATION });
const Provider = store.Provider;

export class AppProvider extends Component {
  state = {
    date: new Date(),
    updateDate: date => this.setState({ date }),
    location: getItem("location") || INITIAL_LOCATION,
    updateLocation: location => this.setState({ location }),
    forecast: getItem("forecast") || null,
    updateForecast: forecast => this.setState({ forecast })
  };

  componentDidUpdate() {
    const dataToCacheLocally = ["location", "forecast"];

    Object.keys(this.state).forEach(key => {
      if (dataToCacheLocally.includes(key) && this.state[key]) {
        setItem(key, this.state[key]);
      }
    });
  }

  storeLocally = (key, value) => {
    setItem(key, value);
  };

  render() {
    console.log("STORE", this.state);

    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export function withStore(Component) {
  return props => {
    return (
      <store.Consumer>
        {store => {
          return <Component {...props} store={store} />;
        }}
      </store.Consumer>
    );
  };
}
